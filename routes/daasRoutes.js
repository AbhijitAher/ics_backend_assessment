/**
 * @swagger
 * /daas/v2_analyse:
 *   post:
 *     summary: Analyze a query and save the response to the database
 *     description: Sends the query to the DAAS API for analysis and stores the result in the database.
 *     tags:
 *       - DAAS API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The query string to be analyzed.
 *                 example: "lung carcinoma, breast cancer"
 *     responses:
 *       201:
 *         description: Successfully created a new DAAS response entry in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the DAAS response.
 *                 query:
 *                   type: string
 *                   description: The original query that was analyzed.
 *                 data_received:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       token:
 *                         type: array
 *                         items:
 *                           type: string
 *                       start_offset:
 *                         type: number
 *                       end_offset:
 *                         type: number
 *               example:
 *                 _id: "60c72b2f9b1e8a3d1c4a0f7e"
 *                 query: "lung carcinoma, breast cancer"
 *                 data_received:
 *                   - token: ["dummy_token"]
 *                     start_offset: 0
 *                     end_offset: 14
 *                   - token: ["dummy_token1", "dummy_token2"]
 *                     start_offset: 16
 *                     end_offset: 29
 *       400:
 *         description: Bad request due to invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid query"
 *       204:
 *         description: No data returned from the API.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data returned from API"
 *       500:
 *         description: Internal server error due to missing API key.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "API key is not configured"
 */

const express = require("express");
const { analyzeQueryAndSaveToDB } = require("../controllers/daasController");

const router = express.Router();

router.post("/v2_analyse", analyzeQueryAndSaveToDB);

module.exports = router;
