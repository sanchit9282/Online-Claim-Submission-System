"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/claims";
exports.ids = ["pages/api/claims"];
exports.modules = {

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "(api)/./pages/api/claims/index.ts":
/*!***********************************!*\
  !*** ./pages/api/claims/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _utils_mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/mongodb */ \"(api)/./utils/mongodb.ts\");\n/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/auth */ \"(api)/./utils/auth.ts\");\n\n\nasync function handler(req, res) {\n    if (req.method === \"GET\") {\n        try {\n            const user = await (0,_utils_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(req);\n            if (!user) {\n                console.error(\"Unauthorized request: Invalid token\");\n                return res.status(401).json({\n                    message: \"Unauthorized\"\n                });\n            }\n            const { db  } = await (0,_utils_mongodb__WEBPACK_IMPORTED_MODULE_0__.connectToDatabase)();\n            const claims = await db.collection(\"claims\").find({\n                userId: user.userId\n            }).toArray();\n            res.status(200).json(claims);\n        } catch (error) {\n            console.error(\"Error fetching claims:\", error);\n            res.status(500).json({\n                message: \"Server error\"\n            });\n        }\n    } else if (req.method === \"POST\") {\n        try {\n            const user = await (0,_utils_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(req);\n            if (!user) {\n                return res.status(401).json({\n                    message: \"Unauthorized\"\n                });\n            }\n            const { vehicleInfo , description  } = req.body;\n            if (!vehicleInfo || !description) {\n                return res.status(400).json({\n                    message: \"Missing required fields\"\n                });\n            }\n            const { db  } = await (0,_utils_mongodb__WEBPACK_IMPORTED_MODULE_0__.connectToDatabase)();\n            const newClaim = {\n                userId: user.userId,\n                vehicleInfo,\n                description,\n                claimStatus: \"pending\",\n                dateSubmitted: new Date().toISOString()\n            };\n            console.log(\"Received claim data:\", vehicleInfo, description);\n            console.log(\"Inserting claim for user:\", user.userId);\n            const result = await db.collection(\"claims\").insertOne(newClaim);\n            console.log(\"Insert result:\", result);\n            return res.status(201).json({\n                message: \"Claim successfully submitted\",\n                data: {\n                    ...newClaim,\n                    _id: result.insertedId\n                }\n            });\n        } catch (error) {\n            console.error(\"Error submitting claim:\", error);\n            return res.status(500).json({\n                message: \"Server error\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"GET\",\n            \"POST\"\n        ]);\n        res.status(405).end(`Method ${req.method} Not Allowed`);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2xhaW1zL2luZGV4LnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUMwRDtBQUNUO0FBRWxDLGVBQWVFLFFBQVFDLEdBQW1CLEVBQUVDLEdBQW9CO0lBQzdFLElBQUlELElBQUlFLFdBQVcsT0FBTztRQUN4QixJQUFJO1lBQ0YsTUFBTUMsT0FBTyxNQUFNTCx3REFBV0EsQ0FBQ0U7WUFDL0IsSUFBSSxDQUFDRyxNQUFNO2dCQUNUQyxRQUFRQyxNQUFNO2dCQUNkLE9BQU9KLElBQUlLLE9BQU8sS0FBS0MsS0FBSztvQkFBRUMsU0FBUztnQkFBZTtZQUN4RDtZQUVBLE1BQU0sRUFBRUMsR0FBRSxFQUFFLEdBQUcsTUFBTVosaUVBQWlCQTtZQUV0QyxNQUFNYSxTQUFTLE1BQU1ELEdBQUdFLFdBQVcsVUFDaENDLEtBQUs7Z0JBQUVDLFFBQVFWLEtBQUtVO1lBQU8sR0FDM0JDO1lBRUhiLElBQUlLLE9BQU8sS0FBS0MsS0FBS0c7UUFDdkIsRUFBRSxPQUFPTCxPQUFPO1lBQ2RELFFBQVFDLE1BQU0sMEJBQTBCQTtZQUN4Q0osSUFBSUssT0FBTyxLQUFLQyxLQUFLO2dCQUFFQyxTQUFTO1lBQWU7UUFDakQ7SUFDRixPQUFPLElBQUlSLElBQUlFLFdBQVcsUUFBUTtRQUNoQyxJQUFJO1lBQ0YsTUFBTUMsT0FBTyxNQUFNTCx3REFBV0EsQ0FBQ0U7WUFDL0IsSUFBSSxDQUFDRyxNQUFNO2dCQUNULE9BQU9GLElBQUlLLE9BQU8sS0FBS0MsS0FBSztvQkFBRUMsU0FBUztnQkFBZTtZQUN4RDtZQUVBLE1BQU0sRUFBRU8sWUFBVyxFQUFFQyxZQUFXLEVBQUUsR0FBR2hCLElBQUlpQjtZQUN6QyxJQUFJLENBQUNGLGVBQWUsQ0FBQ0MsYUFBYTtnQkFDaEMsT0FBT2YsSUFBSUssT0FBTyxLQUFLQyxLQUFLO29CQUFFQyxTQUFTO2dCQUEwQjtZQUNuRTtZQUVBLE1BQU0sRUFBRUMsR0FBRSxFQUFFLEdBQUcsTUFBTVosaUVBQWlCQTtZQUN0QyxNQUFNcUIsV0FBVztnQkFDZkwsUUFBUVYsS0FBS1U7Z0JBQ2JFO2dCQUNBQztnQkFDQUcsYUFBYTtnQkFDYkMsZUFBZSxJQUFJQyxPQUFPQztZQUM1QjtZQUVBbEIsUUFBUW1CLElBQUksd0JBQXdCUixhQUFhQztZQUNqRFosUUFBUW1CLElBQUksNkJBQTZCcEIsS0FBS1U7WUFDOUMsTUFBTVcsU0FBUyxNQUFNZixHQUFHRSxXQUFXLFVBQVVjLFVBQVVQO1lBQ3ZEZCxRQUFRbUIsSUFBSSxrQkFBa0JDO1lBRTlCLE9BQU92QixJQUFJSyxPQUFPLEtBQUtDLEtBQUs7Z0JBQUVDLFNBQVM7Z0JBQWdDa0IsTUFBTTtvQkFBRSxHQUFHUixRQUFRO29CQUFFUyxLQUFLSCxPQUFPSTtnQkFBVztZQUFFO1FBQ3ZILEVBQUUsT0FBT3ZCLE9BQU87WUFDZEQsUUFBUUMsTUFBTSwyQkFBMkJBO1lBQ3pDLE9BQU9KLElBQUlLLE9BQU8sS0FBS0MsS0FBSztnQkFBRUMsU0FBUztZQUFlO1FBQ3hEO0lBQ0YsT0FBTztRQUNMUCxJQUFJNEIsVUFBVSxTQUFTO1lBQUM7WUFBTztTQUFPO1FBQ3RDNUIsSUFBSUssT0FBTyxLQUFLd0IsSUFBSSxDQUFDLE9BQU8sRUFBRTlCLElBQUlFLE9BQU8sWUFBWSxDQUFDO0lBQ3hEO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGFpbS1zdWJtaXNzaW9uLXN5c3RlbS8uL3BhZ2VzL2FwaS9jbGFpbXMvaW5kZXgudHM/MzQwNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xuaW1wb3J0IHsgY29ubmVjdFRvRGF0YWJhc2UgfSBmcm9tICcuLi8uLi8uLi91dGlscy9tb25nb2RiJ1xuaW1wb3J0IHsgdmVyaWZ5VG9rZW4gfSBmcm9tICcuLi8uLi8uLi91dGlscy9hdXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XG4gIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdmVyaWZ5VG9rZW4ocmVxKVxuICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYXV0aG9yaXplZCByZXF1ZXN0OiBJbnZhbGlkIHRva2VuJyk7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZGIgfSA9IGF3YWl0IGNvbm5lY3RUb0RhdGFiYXNlKClcblxuICAgICAgY29uc3QgY2xhaW1zID0gYXdhaXQgZGIuY29sbGVjdGlvbignY2xhaW1zJylcbiAgICAgICAgLmZpbmQoeyB1c2VySWQ6IHVzZXIudXNlcklkIH0pXG4gICAgICAgIC50b0FycmF5KClcblxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oY2xhaW1zKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjbGFpbXM6JywgZXJyb3IpXG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6ICdTZXJ2ZXIgZXJyb3InIH0pXG4gICAgfVxuICB9IGVsc2UgaWYgKHJlcS5tZXRob2QgPT09ICdQT1NUJykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdmVyaWZ5VG9rZW4ocmVxKTtcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiAnVW5hdXRob3JpemVkJyB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyB2ZWhpY2xlSW5mbywgZGVzY3JpcHRpb24gfSA9IHJlcS5ib2R5O1xuICAgICAgaWYgKCF2ZWhpY2xlSW5mbyB8fCAhZGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogJ01pc3NpbmcgcmVxdWlyZWQgZmllbGRzJyB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBkYiB9ID0gYXdhaXQgY29ubmVjdFRvRGF0YWJhc2UoKTtcbiAgICAgIGNvbnN0IG5ld0NsYWltID0ge1xuICAgICAgICB1c2VySWQ6IHVzZXIudXNlcklkLFxuICAgICAgICB2ZWhpY2xlSW5mbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGNsYWltU3RhdHVzOiAncGVuZGluZycsXG4gICAgICAgIGRhdGVTdWJtaXR0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBjbGFpbSBkYXRhOicsIHZlaGljbGVJbmZvLCBkZXNjcmlwdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygnSW5zZXJ0aW5nIGNsYWltIGZvciB1c2VyOicsIHVzZXIudXNlcklkKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oJ2NsYWltcycpLmluc2VydE9uZShuZXdDbGFpbSk7XG4gICAgICBjb25zb2xlLmxvZygnSW5zZXJ0IHJlc3VsdDonLCByZXN1bHQpO1xuXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oeyBtZXNzYWdlOiAnQ2xhaW0gc3VjY2Vzc2Z1bGx5IHN1Ym1pdHRlZCcsIGRhdGE6IHsgLi4ubmV3Q2xhaW0sIF9pZDogcmVzdWx0Lmluc2VydGVkSWQgfSB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc3VibWl0dGluZyBjbGFpbTonLCBlcnJvcik7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAnU2VydmVyIGVycm9yJyB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzLnNldEhlYWRlcignQWxsb3cnLCBbJ0dFVCcsICdQT1NUJ10pXG4gICAgcmVzLnN0YXR1cyg0MDUpLmVuZChgTWV0aG9kICR7cmVxLm1ldGhvZH0gTm90IEFsbG93ZWRgKVxuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJjb25uZWN0VG9EYXRhYmFzZSIsInZlcmlmeVRva2VuIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInVzZXIiLCJjb25zb2xlIiwiZXJyb3IiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImRiIiwiY2xhaW1zIiwiY29sbGVjdGlvbiIsImZpbmQiLCJ1c2VySWQiLCJ0b0FycmF5IiwidmVoaWNsZUluZm8iLCJkZXNjcmlwdGlvbiIsImJvZHkiLCJuZXdDbGFpbSIsImNsYWltU3RhdHVzIiwiZGF0ZVN1Ym1pdHRlZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsImxvZyIsInJlc3VsdCIsImluc2VydE9uZSIsImRhdGEiLCJfaWQiLCJpbnNlcnRlZElkIiwic2V0SGVhZGVyIiwiZW5kIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/claims/index.ts\n");

/***/ }),

/***/ "(api)/./utils/auth.ts":
/*!***********************!*\
  !*** ./utils/auth.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nconst verifyToken = (req)=>{\n    const authHeader = req.headers.authorization;\n    if (!authHeader) {\n        console.error(\"No authorization header found\");\n        return null;\n    }\n    const token = authHeader.split(\" \")[1];\n    console.log(\"Token received for verification:\", token);\n    if (!token) {\n        console.error(\"Token not found in the authorization header\");\n        return null;\n    }\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, process.env.JWT_SECRET);\n        console.log(\"Token successfully verified:\", decoded);\n        return decoded;\n    } catch (error) {\n        console.error(\"Error while verifying token:\", error);\n        return null;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUM4QjtBQUV2QixNQUFNQyxjQUFjLENBQUNDO0lBQzFCLE1BQU1DLGFBQWFELElBQUlFLFFBQVFDO0lBRS9CLElBQUksQ0FBQ0YsWUFBWTtRQUNmRyxRQUFRQyxNQUFNO1FBQ2QsT0FBTztJQUNUO0lBRUEsTUFBTUMsUUFBUUwsV0FBV00sTUFBTSxJQUFJLENBQUMsRUFBRTtJQUN0Q0gsUUFBUUksSUFBSSxvQ0FBb0NGO0lBQ2hELElBQUksQ0FBQ0EsT0FBTztRQUNWRixRQUFRQyxNQUFNO1FBQ2QsT0FBTztJQUNUO0lBRUEsSUFBSTtRQUNGLE1BQU1JLFVBQVVYLDBEQUFVWSxDQUFDSixPQUFPSyxRQUFRQyxJQUFJQztRQUM5Q1QsUUFBUUksSUFBSSxnQ0FBZ0NDO1FBQzVDLE9BQU9BO0lBQ1QsRUFBRSxPQUFPSixPQUFPO1FBQ2RELFFBQVFDLE1BQU0sZ0NBQWdDQTtRQUM5QyxPQUFPO0lBQ1Q7QUFDRixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xhaW0tc3VibWlzc2lvbi1zeXN0ZW0vLi91dGlscy9hdXRoLnRzP2IzOGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QgfSBmcm9tICduZXh0J1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nXG5cbmV4cG9ydCBjb25zdCB2ZXJpZnlUb2tlbiA9IChyZXE6IE5leHRBcGlSZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uO1xuICBcbiAgaWYgKCFhdXRoSGVhZGVyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIk5vIGF1dGhvcml6YXRpb24gaGVhZGVyIGZvdW5kXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyLnNwbGl0KCcgJylbMV07XG4gIGNvbnNvbGUubG9nKCdUb2tlbiByZWNlaXZlZCBmb3IgdmVyaWZpY2F0aW9uOicsIHRva2VuKTtcbiAgaWYgKCF0b2tlbikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJUb2tlbiBub3QgZm91bmQgaW4gdGhlIGF1dGhvcml6YXRpb24gaGVhZGVyXCIpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCEpIGFzIHsgdXNlcklkOiBzdHJpbmcgfVxuICAgIGNvbnNvbGUubG9nKFwiVG9rZW4gc3VjY2Vzc2Z1bGx5IHZlcmlmaWVkOlwiLCBkZWNvZGVkKTtcbiAgICByZXR1cm4gZGVjb2RlZFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB3aGlsZSB2ZXJpZnlpbmcgdG9rZW46XCIsIGVycm9yKTtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJqd3QiLCJ2ZXJpZnlUb2tlbiIsInJlcSIsImF1dGhIZWFkZXIiLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsImNvbnNvbGUiLCJlcnJvciIsInRva2VuIiwic3BsaXQiLCJsb2ciLCJkZWNvZGVkIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/auth.ts\n");

/***/ }),

/***/ "(api)/./utils/mongodb.ts":
/*!**************************!*\
  !*** ./utils/mongodb.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectToDatabase: () => (/* binding */ connectToDatabase)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable inside .env.local\");\n}\nif (!process.env.MONGODB_DB) {\n    throw new Error(\"Please define the MONGODB_DB environment variable inside .env.local\");\n}\nlet cachedClient = null;\nlet cachedDb = null;\nasync function connectToDatabase() {\n    if (cachedClient && cachedDb) {\n        return {\n            client: cachedClient,\n            db: cachedDb\n        };\n    }\n    const client = await mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient.connect(process.env.MONGODB_URI);\n    const db = await client.db(process.env.MONGODB_DB);\n    cachedClient = client;\n    cachedDb = db;\n    return {\n        client,\n        db\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9tb25nb2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFxQztBQUVyQyxJQUFJLENBQUNDLFFBQVFDLElBQUlDLGFBQWE7SUFDNUIsTUFBTSxJQUFJQyxNQUFNO0FBQ2xCO0FBRUEsSUFBSSxDQUFDSCxRQUFRQyxJQUFJRyxZQUFZO0lBQzNCLE1BQU0sSUFBSUQsTUFBTTtBQUNsQjtBQUVBLElBQUlFLGVBQW1DO0FBQ3ZDLElBQUlDLFdBQWdCO0FBRWIsZUFBZUM7SUFDcEIsSUFBSUYsZ0JBQWdCQyxVQUFVO1FBQzVCLE9BQU87WUFBRUUsUUFBUUg7WUFBY0ksSUFBSUg7UUFBUztJQUM5QztJQUVBLE1BQU1FLFNBQVMsTUFBTVQsZ0RBQVdBLENBQUNXLFFBQVFWLFFBQVFDLElBQUlDO0lBRXJELE1BQU1PLEtBQUssTUFBTUQsT0FBT0MsR0FBR1QsUUFBUUMsSUFBSUc7SUFFdkNDLGVBQWVHO0lBQ2ZGLFdBQVdHO0lBRVgsT0FBTztRQUFFRDtRQUFRQztJQUFHO0FBQ3RCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xhaW0tc3VibWlzc2lvbi1zeXN0ZW0vLi91dGlscy9tb25nb2RiLnRzP2NiNDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJ1xuXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcignUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGUgaW5zaWRlIC5lbnYubG9jYWwnKVxufVxuXG5pZiAoIXByb2Nlc3MuZW52Lk1PTkdPREJfREIpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgZGVmaW5lIHRoZSBNT05HT0RCX0RCIGVudmlyb25tZW50IHZhcmlhYmxlIGluc2lkZSAuZW52LmxvY2FsJylcbn1cblxubGV0IGNhY2hlZENsaWVudDogTW9uZ29DbGllbnQgfCBudWxsID0gbnVsbFxubGV0IGNhY2hlZERiOiBhbnkgPSBudWxsXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0VG9EYXRhYmFzZSgpIHtcbiAgaWYgKGNhY2hlZENsaWVudCAmJiBjYWNoZWREYikge1xuICAgIHJldHVybiB7IGNsaWVudDogY2FjaGVkQ2xpZW50LCBkYjogY2FjaGVkRGIgfVxuICB9XG5cbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgTW9uZ29DbGllbnQuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSSBhcyBzdHJpbmcpXG5cbiAgY29uc3QgZGIgPSBhd2FpdCBjbGllbnQuZGIocHJvY2Vzcy5lbnYuTU9OR09EQl9EQilcblxuICBjYWNoZWRDbGllbnQgPSBjbGllbnRcbiAgY2FjaGVkRGIgPSBkYlxuXG4gIHJldHVybiB7IGNsaWVudCwgZGIgfVxufVxuXG4iXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJwcm9jZXNzIiwiZW52IiwiTU9OR09EQl9VUkkiLCJFcnJvciIsIk1PTkdPREJfREIiLCJjYWNoZWRDbGllbnQiLCJjYWNoZWREYiIsImNvbm5lY3RUb0RhdGFiYXNlIiwiY2xpZW50IiwiZGIiLCJjb25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./utils/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/claims/index.ts"));
module.exports = __webpack_exports__;

})();