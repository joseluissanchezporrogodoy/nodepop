# NodePop

*NODEPOP* is an API developed to test the business viability of a second-hand sale / purchase application. 

**Installation and requirements**
----
#### Requirements

Has been tested with the following versions:
    
    - Node 7.10.0
    - npm 4.2.0
Other secundary libraries are specific in: *package.json*
#### Installation

- Install

`git clone https://github.com/joseluissanchezporrogodoy/nodepop.git`  
`cd <proyect_path>`  
`npm install` 

`npm run dev (MacOS)`  
`npm run dev:win (Windows)`

- Inicializate database with examples

`npm run installDB`




**Regiter User**
----

This is to register users.

* **URL**

  </apiv2/usuarios>

* **Method:**
  
  `POST`
  
 *  **URL Params**
  
     **Optional:**
   
     `lan=[String]`  
     
     May be 'es' for Spanish 'en' English
  
* **Data Params**

  `nombre:[String]`  
  `email:[String]`  
  `clave:[Alfanumeric]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "success": true,"data": "Usuario creado" }`
 
* **Error Response:**

  * **Code:** 400 EMPTY_FIELD <br />
    **Content:** `{ "success": false,"error": "Empty fields"}`

  OR

  * **Code:** 401 USER_REGISTERED ENTRY <br />
    **Content:** `{"success": false,"error": "User registered"}`
    
  OR
  
    * **Code:** 400 MAIL_FORMAT_INCORRECT <br />
      **Content:** `{"success": false,"error": "Formato de correo no válido"}`  
      
**Login User**
----

This is to register users.

* **URL**

  </apiv2/usuarios/autenticate>

* **Method:**
  
  `POST`
  
 *  **URL Params**
  
     **Optional:**
   
     `lan=[String]`  
     
     May be 'es' for Spanish 'en' English
  
* **Data Params**
 
  `email:[String]`  
  `clave:[Alfanumeric]`
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "success": true,"token": "<Aphanumeric token>" }`
 
* **Error Response:**

  * **Code:** 404 INVALID_PASSWORD <br />
    **Content:** `{ "success": false,"error": "Invalid password"}`

  OR

  * **Code:** 404 USER_NOT_FOUND <br />
    **Content:** `{"success": false,"error": "User doesn't found"}`
    
     