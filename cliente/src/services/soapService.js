import axios from 'axios'

const soapUrl = import.meta.env.VITE_SOAP_URL

export default {
  // INSERTAR ARTÍCULO - VERSIÓN CON DIFERENTES FORMATOS
  async insertItem(dto) {
    // PROBAR DIFERENTES FORMATOS DE XML
    const xmlTemplates = [
      // Formato 1: Con namespace calificado
      `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 
               xmlns:i="urn:inventory">
  <soap:Body>
    <i:InsertItem>
      <i:dto>
        <i:Code>${this.escapeXml(dto.Code)}</i:Code>
        <i:Name>${this.escapeXml(dto.Name)}</i:Name>
        <i:Category>${this.escapeXml(dto.Category)}</i:Category>
        <i:PurchasePrice>${dto.PurchasePrice}</i:PurchasePrice>
        <i:SalePrice>${dto.SalePrice}</i:SalePrice>
        <i:Stock>${dto.Stock}</i:Stock>
        <i:MinStock>${dto.MinStock}</i:MinStock>
        <i:Supplier>${this.escapeXml(dto.Supplier)}</i:Supplier>
      </i:dto>
    </i:InsertItem>
  </soap:Body>
</soap:Envelope>`,

      // Formato 2: Sin namespace en elementos hijos
      `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <InsertItem xmlns="urn:inventory">
      <dto>
        <Code>${this.escapeXml(dto.Code)}</Code>
        <Name>${this.escapeXml(dto.Name)}</Name>
        <Category>${this.escapeXml(dto.Category)}</Category>
        <PurchasePrice>${dto.PurchasePrice}</PurchasePrice>
        <SalePrice>${dto.SalePrice}</SalePrice>
        <Stock>${dto.Stock}</Stock>
        <MinStock>${dto.MinStock}</MinStock>
        <Supplier>${this.escapeXml(dto.Supplier)}</Supplier>
      </dto>
    </InsertItem>
  </soap:Body>
</soap:Envelope>`,

      // Formato 3: Sin namespace en absoluto
      `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <InsertItem>
      <dto>
        <Code>${this.escapeXml(dto.Code)}</Code>
        <Name>${this.escapeXml(dto.Name)}</Name>
        <Category>${this.escapeXml(dto.Category)}</Category>
        <PurchasePrice>${dto.PurchasePrice}</PurchasePrice>
        <SalePrice>${dto.SalePrice}</SalePrice>
        <Stock>${dto.Stock}</Stock>
        <MinStock>${dto.MinStock}</MinStock>
        <Supplier>${this.escapeXml(dto.Supplier)}</Supplier>
      </dto>
    </InsertItem>
  </soap:Body>
</soap:Envelope>`
    ]

    const soapActions = [
      'urn:inventory/InsertItem',
      'urn:inventory/IInventorySoap/InsertItem', 
      'InsertItem',
      'urn:inventory#InsertItem',
      ''
    ]

    console.log('🔍 Probando diferentes combinaciones SOAP...')

    // Probar todas las combinaciones
    for (let i = 0; i < xmlTemplates.length; i++) {
      for (let j = 0; j < soapActions.length; j++) {
        const xml = xmlTemplates[i]
        const soapAction = soapActions[j]
        
        console.log(`🧪 Intento ${i * soapActions.length + j + 1}:`)
        console.log('📤 XML:', xml.substring(0, 100) + '...')
        console.log('🎯 SOAPAction:', soapAction)

        try {
          const response = await axios.post(soapUrl, xml, {
            headers: {
              'Content-Type': 'text/xml; charset=utf-8',
              'SOAPAction': soapAction
            },
            timeout: 10000
          })

          console.log(`✅ ÉXITO con combinación ${i + 1}-${j + 1}`)
          console.log('📥 Respuesta:', response.data)
          return response.data

        } catch (err) {
          console.log(`❌ Falló combinación ${i + 1}-${j + 1}:`, err.response?.status)
          
          // Si es error diferente a 500, podría ser otra cosa
          if (err.response?.status !== 500) {
            console.log('⚠️ Error diferente, deteniendo pruebas...')
            throw new Error(`Error HTTP ${err.response?.status}: ${err.response?.statusText}`)
          }
          
          // Continuar con la siguiente combinación
          continue
        }
      }
    }

    // Si llegamos aquí, todas las combinaciones fallaron
    throw new Error('Todas las combinaciones SOAP fallaron. Verifica la configuración del servidor.')
  },

  // CONSULTAR ARTÍCULO POR CÓDIGO
  async getItemByCode(code) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetItemByCode xmlns="urn:inventory">
      <code>${this.escapeXml(code)}</code>
    </GetItemByCode>
  </soap:Body>
</soap:Envelope>`

    try {
      const response = await axios.post(soapUrl, xml, {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'SOAPAction': 'urn:inventory/GetItemByCode'
        }
      })

      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml')
      
      const fault = xmlDoc.getElementsByTagName('s:Fault')[0]
      if (fault) {
        const faultString = fault.getElementsByTagName('faultstring')[0]?.textContent
        console.error('❌ SOAP Fault:', faultString)
        return null
      }

      const resultNode = xmlDoc.getElementsByTagName('GetItemByCodeResult')[0]
      if (!resultNode) {
        console.warn('⚠️ No se encontró GetItemByCodeResult en la respuesta')
        return null
      }

      return {
        Code: resultNode.getElementsByTagName('Code')[0]?.textContent,
        Name: resultNode.getElementsByTagName('Name')[0]?.textContent,
        Category: resultNode.getElementsByTagName('Category')[0]?.textContent,
        PurchasePrice: parseFloat(resultNode.getElementsByTagName('PurchasePrice')[0]?.textContent || 0),
        SalePrice: parseFloat(resultNode.getElementsByTagName('SalePrice')[0]?.textContent || 0),
        Stock: parseInt(resultNode.getElementsByTagName('Stock')[0]?.textContent || 0),
        MinStock: parseInt(resultNode.getElementsByTagName('MinStock')[0]?.textContent || 0),
        Supplier: resultNode.getElementsByTagName('Supplier')[0]?.textContent
      }
      
    } catch (error) {
      console.error('❌ SOAP GetItemByCode Error:', error.response?.data || error)
      return null
    }
  },

  // Función auxiliar para escapar XML
  escapeXml(unsafe) {
    if (unsafe === null || unsafe === undefined) return ''
    return unsafe.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
}