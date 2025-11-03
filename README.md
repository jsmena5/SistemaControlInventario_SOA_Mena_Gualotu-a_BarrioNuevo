🧩 Sistema de Control de Inventario — SOAP (.NET + CoreWCF) y Cliente Vue

Proyecto académico que implementa un Sistema de Administración de Inventarios bajo una arquitectura SOA (Service Oriented Architecture).
Consta de dos componentes principales:

Servidor (Backend): Desarrollado en .NET 8 + CoreWCF + PostgreSQL, responsable de exponer un servicio SOAP para operaciones CRUD de inventario.

Cliente (Frontend): Desarrollado con Vue 3 + Vite + Axios, encargado de consumir el servicio SOAP y presentar una interfaz web moderna y funcional.


📦 Estructura del Repositorio

<img width="861" height="353" alt="image" src="https://github.com/user-attachments/assets/9d2989d5-61f2-4957-8008-88022c701d73" />



⚙️ Tecnologías Utilizadas
🖥️ Backend (.NET + CoreWCF)

.NET 8 / ASP.NET Core MVC

CoreWCF (para servicios SOAP)

Entity Framework Core

PostgreSQL

AutoMapper

Serilog (logging)

Bootstrap + Razor Views (UI del panel)


🌐 Frontend (Vue 3 + Vite)

Vue 3 (Composition API)

Axios (consumo SOAP/XML)

Bootstrap 5.3

Vite (servidor de desarrollo y build)

Login modal simulado (admin / 1234)


🧠 Arquitectura del Sistema

<img width="1195" height="396" alt="image" src="https://github.com/user-attachments/assets/ab851c72-652a-482f-a7d1-309469293dff" />





🧩 Instalación y Ejecución
🔹 Servidor (.NET)

Descomprime ferreServer.7z

Abre el proyecto en Visual Studio o VS Code

Instala dependencias:

dotnet restore


Configura la conexión a PostgreSQL en appsettings.json:

"ConnectionStrings": {
    "Pg": "Host=localhost;Port=5432;Database=inventorydb;Username=postgres;Password=TU_PASSWORD"
}


Ejecuta el proyecto:

dotnet run



📍 Endpoints disponibles:

Landing: http://localhost:5000/

Panel de gestión: http://localhost:5000/Home/Index

Gestión de productos: http://localhost:5000/Items

Control de stock: http://localhost:5000/Items/LowStock

Servicio SOAP: http://localhost:5000/soap/inventory

WSDL: http://localhost:5000/soap/inventory?wsdl


🔹 Cliente (Vue 3)

Abre una terminal en la carpeta cliente/

Instala dependencias:

npm install


Configura el archivo .env con la URL de tu servicio SOAP:

VITE_SOAP_URL=http://localhost:5000/soap/inventory


Ejecuta el servidor de desarrollo:

npm run dev


Abre el navegador en:

http://localhost:5173/


El cliente se conecta directamente al servicio SOAP para realizar operaciones de inserción y consulta.


🧾 Operaciones SOAP Disponibles
InsertItem

Inserta un nuevo producto en el inventario.

POST /soap/inventory
Content-Type: text/xml; charset=utf-8
SOAPAction: "urn:inventory/IInventorySoap/InsertItem"

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <InsertItem xmlns="urn:inventory">
      <dto>
        <Code>ITEM-001</Code>
        <Name>Taladro Pro 500</Name>
        <Category>Herramientas</Category>
        <PurchasePrice>50</PurchasePrice>
        <SalePrice>75</SalePrice>
        <Stock>10</Stock>
        <MinStock>2</MinStock>
        <Supplier>ACME</Supplier>
      </dto>
    </InsertItem>
  </soap:Body>
</soap:Envelope>

GetItemByCode

Consulta la información de un producto existente.

POST /soap/inventory
Content-Type: text/xml; charset=utf-8
SOAPAction: "urn:inventory/IInventorySoap/GetItemByCode"

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetItemByCode xmlns="urn:inventory">
      <code>ITEM-001</code>
    </GetItemByCode>
  </soap:Body>
</soap:Envelope>


🧩 Simulación de Inicio de Sesión

En la landing principal, los botones “Ir al panel” abren un modal de login.
Credenciales:

Usuario: admin
Contraseña: 1234


Si son correctas, se redirige al panel /Home/Index (dashboard principal).
En caso contrario, muestra una alerta de error sin recargar la página.


🧰 Recomendaciones

Ejecutar el backend antes que el frontend.

Si consumes el servicio SOAP desde otra IP, asegúrate de configurar correctamente CORS en Program.cs.

Evita incluir bin/, obj/, .vs/, y node_modules/ al comprimir o subir versiones del proyecto.


📜 Licencia

Este proyecto fue desarrollado con fines académicos y de demostración técnica.
Puede ser reutilizado y modificado libremente con fines educativos.


👥 Autores

SistemaControlInventario_SOA_Mena_Gualotuña_BarrioNuevo
Proyecto colaborativo desarrollado por:
Lenin Barrionuevo
Jesús Mena
Paúl Gualotuña
