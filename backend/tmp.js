      //Create Subscription First
      let result = await sequelize.query(`INSERT INTO Subscription (monthlyLimit, weeklyLimit, dailyLimit) VALUES (10, 10, 10);`, {
        type: sequelize.QueryTypes.INSERT
      })
      console.log("result:", result);

      //Find Last Subscription ID
      result = await sequelize.query(`SELECT * FROM Subscription ORDER BY subscriptionId DESC LIMIT 1`)

      if (!result[0]) {
        return res.json(400, {
          msg: "Bad subscription insert"
        });
      }

      let subscriptionID = result[0][0]['subscriptionid']
      console.log("SubscriptionID: ", subscriptionID)

      //Register KYC docs
      const uuidv4 = require('uuid/v4');
      let docID = uuidv4();

      console.log(docID, req.body.kyc)

      result = await sequelize.query(`INSERT INTO KYCAMLDocs (docID, expireDate) VALUES ('${docID}', '${req.body.kyc.expDate}');`, {
        type: sequelize.QueryTypes.INSERT
      })

      //Register Passport or Drivers Licesce Depending on Type

      //Handle Unique Passport Error
      if (req.body.kyc.type == "Passport") {
        result = await sequelize.query(`INSERT INTO Passport (docID, passportNumber, countryOfIssuance) VALUES ('${docID}', '${req.body.kyc.docNumber}', '${req.body.kyc.placeOfIssuance}');`, {
          type: sequelize.QueryTypes.INSERT
        })
      }

      if (req.body.kyc.type == "DriveLicense") {
        result = await sequelize.query(`INSERT INTO DriversLicense (docID, licenseNumber, province) VALUES ('${docID}', '${req.body.kyc.docNumber}', '${req.body.kyc.placeOfIssuance}');`, {
          type: sequelize.QueryTypes.INSERT
        })
      }

      //Create Customer Profile
      console.log(req.body)
      result = await sequelize.query(`INSERT INTO Customer (firstName, lastName, email, address, country, docID, subscriptionID) VALUES ('${req.body.customer.fname}', '${req.body.customer.lname}', '${req.body.customer.email}', '${req.body.customer.address}', '${req.body.customer.country}', '${docID}', '${subscriptionID}');`, {
        type: sequelize.QueryTypes.INSERT
      })

      //Retrieve Last Customer Id
      result = await sequelize.query(`SELECT * FROM Customer ORDER BY customerId DESC LIMIT 1`)
      if (!result[0]) {
        return res.status(400).json({
          msg: "Bad customer insert"
        });
      }
      let customerId = result[0][0]['customerid']

      console.log("customerId", customerId);

      //Create Account
      result = await sequelize.query(`INSERT INTO Account (username, password, created_on, customerID) VALUES ('${req.body.account.username}', '${req.body.account.password1}', to_timestamp(${Date.now()} / 1000.0) ,'${customerId}');`, {
        type: sequelize.QueryTypes.INSERT
      })