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
      
**Autenticate User**
----

This is to autenticate users.

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
    
    
    
**Adverts list**
----

This is to get adverts list and filter it.

* **URL**

  </apiv2/usuarios/anuncios>

* **Method:**
  
  `GET`  
 *  **URL Params**
  
     **Required:**  
         
     `token=[Alphanumeric]` // For check if the user is autorized 
     
     **Optional:**
   
     `lan=[String]`  // May be 'es' for Spanish 'en' English  
     
     **Optional for Filter:**
     
     `tag=[String]`  // Ads that are tagged   
     `sale=[Boolean]`  // Whether the ad is a sale or a search  
     `name=[String]`  // Ads whose name begins with the value supplied   
     `price=[Number]`  // 
Filter by price. You can specify a range by separating the values ​​with '-'. The allowed combinations would be 50- (May of 50), -100 (less than 100) or 50-10 (between 50 and 100)   
     `start=[Number]`  // Number of ads to ignore result  
     `start=[Number]`  // Number of ads to get
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "success": true,"result": "<List of filtered or unfiltered Ads>" }`
 
* **Error Response:**

  * **Code:** 401 Unexpected token <br />
    **Content:** `{ "success": false,"error": "Unexpected token"}`


    
**Tags list permited**
----

This is to get tags list permited in the system.

* **URL**

  </apiv2/usuarios/anuncios/tags_permitted>

* **Method:**
  
  `GET`  
 *  **URL Params**
  
     **Required:**  
         
     `token=[Alphanumeric]` // For check if the user is autorized 
     
     **Optional:**
   
     `lan=[String]`  // May be 'es' for Spanish 'en' English  
     
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "success": true,"result": "<List of permitted tags>" }`
 
* **Error Response:**

  * **Code:** 401 Unexpected token <br />
    **Content:** `{ "success": false,"error": "Unexpected token"}`


**Tags list**
----

This is to get tags list in the system.

* **URL**

  </apiv2/usuarios/anuncios/tags>

* **Method:**
  
  `GET`  
 *  **URL Params**
  
     **Required:**  
         
     `token=[Alphanumeric]` // For check if the user is autorized 
     
     **Optional:**
   
     `lan=[String]`  // May be 'es' for Spanish 'en' English  
     
  
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ "success": true,"result": "<List of tags>" }`
 
* **Error Response:**

  * **Code:** 401 Unexpected token <br />
    **Content:** `{ "success": false,"error": "Unexpected token"}`


**Image**
----

This is to get adverts images.

* **URL**

  </apiv2/usuarios/anuncios/imagenes/<image name> >

* **Success Response:**
  
    Imagen
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** `{ "success": false,"error": "Not Found"}`
    
    
    
 # Deployment test
 
The deployment has been done on Amazon AWS. 

* **Domain**

[https://nodepop.joseluissanchezporrogodoy.com](https://nodepop.joseluissanchezporrogodoy.com)

* **GET Example**

[https://nodepop.joseluissanchezporrogodoy.com/apiv1/anuncios](https://nodepop.joseluissanchezporrogodoy.com/apiv1/anuncios)

* **Static file Example**

[https://nodepop.joseluissanchezporrogodoy.com/images/moto.png](https://nodepop.joseluissanchezporrogodoy.com/images/moto.png)

* **Web**

[https://joseluissanchezporrogodoy.com/](https://joseluissanchezporrogodoy.com/)

* **Static ip**

 [13.58.156.255](https://13.58.156.255)