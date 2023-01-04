var express = require("express");
var router = express.Router();
var addressCtrl = require("../controllers/addresses");
var auth = require("../middlewares/auth");
/**
 * @swagger
 *  components:
 *      schemas:
 *          Address:
 *              type: object
 *              required:
 *                  - country
 *                  - city
 *                  - road
 *              properties:
 *                  id:
 *                      type: string
 *                      description: auto generated unique id of the address
 *                  country:
 *                      type: string
 *                      description: the country name
 *                  city:
 *                      type: string
 *                      description: the city name
 *                  road:
 *                      type: string
 *                      description: the road name
 *              example:
 *                  id: 83360252858069b05e4b4c1b
 *                  country: Tunisia
 *                  city: Sfax
 *                  road: Centre Ville
 */

/**
 * @swagger
 *  tags:
 *      name: Address
 *      description: The addresses managing API
 */

/**
 * @swagger
 * /api/address:
 *  get:
 *      summary: Get all addresses
 *      tags: [Address]
 *      responses:
 *          200:
 *              description: The list of the addresses
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Address'
 *          404:
 *              description: No addresses were found
 */
router.get("/", addressCtrl.getAddress);

/**
 * @swagger
 * /api/address/{id}:
 *  get:
 *      summary: Get address by id
 *      tags: [Address]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The address id
 *      responses:
 *          200:
 *              description: Address object by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Address'
 *          404:
 *              description: No address found
 */

router.get("/:id", addressCtrl.getAddressId);

/**
 * @swagger
 * /api/address/country/{country}:
 *  get:
 *      summary: Get addresses by country name
 *      tags: [Address]
 *      parameters:
 *        - in: path
 *          name: country
 *          required: true
 *          schema:
 *              type: string
 *          description: Country Name
 *      responses:
 *          200:
 *              description: Addresses list by country name
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Address'
 *          404:
 *              description: No address found
 */

router.get("/country/:country", addressCtrl.getCities);

/**
@swagger
 * /api/address/country/{country}/city/{city}:
 *  get:
 *      summary: Get addresses by country name
 *      tags: [Address]
 *      parameters:
 *        - in: path
 *          name: country
 *          required: true
 *          schema:
 *              type: string
 *          description: Country Name
 *        - in: path
 *          name: city
 *          required: true
 *          schema:
 *              type: string
 *          description: City Name
 *      responses:
 *          200:
 *              description: Addresses list by country name and city name
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Address'
 *          404:
 *              description: No address found
 */

router.get("/country/:country/city/:city", addressCtrl.getRoads);

/**
 * @swagger
 * /api/address:
 *  post:
 *    summary: Add a new address
 *    tags: [Address]
 *    parameters:
 *      - name: Country
 *        description: Country of the new address
 *        in: body
 *        required: true
 *        type: string
 *        example: Tunisia
 *      - name: "City"
 *        description: City of the new address
 *        in: body
 *        required: true
 *        type: string
 *        example: Sfax
 *      - name: Road
 *        description: Road of the new address
 *        in: body
 *        required: true
 *        type: string
 *        example: Centre Ville
 *    responses:
 *      201:
 *        description: New address created
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              description: New address created
 *              type: boolean
 *              example: true
 *      400:
 *        description: Please check provided values
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              description: Please check provided values
 *              type: boolean
 *              example: false
 */

router.post("/", auth, addressCtrl.addOneAddress);
router.post("/many", auth, addressCtrl.addManyAddress);
router.put("/:id", auth, addressCtrl.updateAddressId);
router.delete("/:id", auth, addressCtrl.deleteAddress);
module.exports = router;
