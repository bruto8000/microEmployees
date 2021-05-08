h1. MICROEMPLOYEES API Для получения сотрудников

*Version:* 1.0.0

----

{toc:printable=true|style=square|minLevel=2|maxLevel=3|type=list|outline=false|include=.*}

h2. Endpoints

    h3. employees
    {status:colour=Yellow|title=get|subtle=false}
    {code}
    get /employees
    {code}
    *Summary:* Получить сотрудников
    *Description:* Типы поиска winlogin fullName personnelNumber


    h4. Parameters

        h5. Body Parameter
        ||Name||Description||Required||Default||Pattern||
        |inventoryItem |Inventory item to add |(x) | |  |







    h4. Responses
        *Status Code:* 200
        *Message:*     Список сотрудников
        {code:title=Response Type}

        {code}
        See [#models]



        {code:title=Response Schema |collapse=true}
{
  "description" : "Список сотрудников"
}
        {code}
        *Status Code:* 400
        *Message:*     Некорректный формат запроса
        {code:title=Response Type}

        {code}
        See [#models]



        {code:title=Response Schema |collapse=true}
{
  "description" : "Некорректный формат запроса"
}
        {code}
        *Status Code:* 500
        *Message:*     Ошибка сервера (MYSQL etc.)
        {code:title=Response Type}

        {code}
        See [#models]



        {code:title=Response Schema |collapse=true}
{
  "description" : "Ошибка сервера (MYSQL etc.)"
}
        {code}
    ----

h2. Models

        h3. Employee
        ||Field Name||Required||Type||Description||
         |searchBy | |String | |
 |parameter | |String | |
 |limit | |BigDecimal | |
