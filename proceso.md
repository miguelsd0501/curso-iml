# Proceso para la creación de este proyecto

Crear modulo invoices

  nest g res invoices

Validar y crear UUID

  yarn add uuid
  yarn add -D @types/uuid

Validacion de parámetros de entrada

  yarn add class-validator class-transformer


## documentación
Instalar swagger

  yarn add @nestjs/swagger


## solicitudes

  curl --location 'localhost:3000/invoices'

  curl --location 'localhost:3000/invoices' \
  --header 'Content-Type: application/json' \
  --data '{
      "rfc": "sadm3123rgfd",
      "customer": "Miguel Santiago",
      "date": "mi fecha",
      "seller": "Alondra",
      "quantity": 4,
      "unitPrice": 12.5,
      "total": 50
  }'

  curl --location 'localhost:3000/invoices/:folio/status'