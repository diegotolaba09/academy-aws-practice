# academy-aws-practice

Se crean tres Lambda Function de ejemplo las cuales son:

1 - createClient: Carga clientes con dni, nombre, apellido y fecha de nacimiento. Solo debe permitir mayores de edad hasta 65 años.

    {
        "dni": "12345679",
        "firstName": "Jhon",
        "lastName": "Doe",
        "birthday": "12/1/1980"
    }    

2 - createCard: Otorga una tarjeta de crédito (Classic si es menor a 45 años y Gold si es mayor) generando número, vencimiento y código de seguridad.

    {
        "dni": "12345679"
    }

3 - createGift: Asigna un regalo de cumpleaños según la estación en la que cae, variando entre buzo si es otoño, sweater si es invierno, camisa si es primavera y remera si es verano.

    {
        "dni": "12345679"
    }