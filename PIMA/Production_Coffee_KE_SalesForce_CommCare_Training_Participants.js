//PARTICIPANTS REGISTRATION JOB {SALESFORCE TO COMMCARE}
each(
  "$.data.participants[*]",
  submit(
    fields(
      field("@", function(state) {
        return {
          "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms",
          "xmlns": "http://openrosa.org/formdesigner/22A693D2-7F34-4B8D-AE12-8A4A57C8868F",
          "uiVersion": "1",
          "version": "325",
          "name": "New Participant",
        };
      }),
      field("Name", function(state){
        var name = '';
        if(dataValue("participantName")(state) !== null) {
          name = dataValue("participantName")(state);
        }
        if(dataValue("participantMiddleName")(state) !== null) {
          name = name+' '+dataValue("participantMiddleName")(state);
        }
        if(dataValue("participantLastName")(state) !== null) {
          name = name+' '+dataValue("participantLastName")(state);
        }
        return name;
      }),
      field("First_Name", dataValue("participantName")),
      field("Middle_Name", dataValue("participantMiddleName")),
      field("Last_Name", dataValue("participantLastName")),
      field("Age", dataValue("participantAge")),
      field("Gender", dataValue("participantGender")),
      field("Phone_Number", dataValue("participantPhoneNumber")),
      field("Farmer_Id", dataValue("tnsId")),
      field("Farmer_Number", function(state){
        var tnsId = dataValue("tnsId")(state);
        var farmerNumber = tnsId.substr(tnsId.length-1,1);
        return farmerNumber;
      }),
      field("Cooperative_Membership_Number", dataValue("participantOtherIDNumber")),
      field("Household_Id", dataValue("householdId")),
      field("Household_Number", dataValue("householdName")),
      field("Number_of_Trees", dataValue("householdFarmSize")),
      field("Parent_Id", dataValue("trainingGroupId")),
      field("Status", dataValue("status")),
      field("Primary_Household_Member", dataValue("participantPrimaryHouseholdMember")),
      field("Case_Id", dataValue("commCareCaseId")),
      field("Name_Household_Concat", function(state){
        var name = '';
        var tnsId = dataValue("tnsId")(state);
        var hhNumber = dataValue("householdName")(state);
        var farmerNumber = tnsId.substr(tnsId.length-1,1);
        
        if(dataValue("participantName")(state) !== null) {
          name = dataValue("participantName")(state);
        }
        if(dataValue("participantMiddleName")(state) !== null) {
          name = name+' '+dataValue("participantMiddleName")(state);
        }
        if(dataValue("participantLastName")(state) !== null) {
          name = name+' '+dataValue("participantLastName")(state);
        }
        return name+' '+hhNumber+'-'+farmerNumber;
      }),
      
      field("n0:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("commCareCaseId")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e926526fc13b126fffdb6d001f25b269",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
          "n0:create": {
            "n0:case_name": function(){
              var name = '';
              if(dataValue("participantName")(state) !== null) {
                name = dataValue("participantName")(state);
              }
              if(dataValue("participantMiddleName")(state) !== null) {
                name = name+' '+dataValue("participantMiddleName")(state);
              }
              if(dataValue("participantLastName")(state) !== null) {
                name = name+' '+dataValue("participantLastName")(state);
              }
              return name;
            },
            "n0:owner_id": dataValue("ccMobileWorkerGroupId")(state),
            "n0:case_type": "coffee-ke-participant"
          },
          "n0:update": {
            "n0:Case_Id": dataValue("commCareCaseId")(state),
            "n0:First_Name": dataValue("participantName")(state),
            "n0:Middle_Name": dataValue("participantMiddleName")(state),
            "n0:Last_Name": dataValue("participantLastName")(state),
            "n0:Age": dataValue("participantAge")(state),
            "n0:Gender": dataValue("participantGender")(state),
            "n0:Phone_Number": dataValue("participantPhoneNumber")(state),
            "n0:Farmer_Id": dataValue("tnsId")(state),
            "n0:Farmer_Number": function(){
              var tnsId = dataValue("tnsId")(state);
              var farmerNumber = tnsId.substr(tnsId.length-1,1);
              return farmerNumber;
            },
            "n0:Cooperative_Membership_Number": dataValue("participantOtherIDNumber")(state),
            "n0:Household_Id": dataValue("householdId")(state),
            "n0:Household_Number": dataValue("householdName")(state),
            "n0:Number_of_Trees": dataValue("householdFarmSize")(state),
            "n0:Status": dataValue("status")(state),
            "n0:Primary_Household_Member": dataValue("participantPrimaryHouseholdMember")(state),
            "n0:Name_Household_Concat": function(){
              var name = '';
              var tnsId = dataValue("tnsId")(state);
              var hhNumber = dataValue("householdName")(state);
              var farmerNumber = tnsId.substr(tnsId.length-1,1);
              
              if(dataValue("participantName")(state) !== null) {
                name = dataValue("participantName")(state);
              }
              if(dataValue("participantMiddleName")(state) !== null) {
                name = name+' '+dataValue("participantMiddleName")(state);
              }
              if(dataValue("participantLastName")(state) !== null) {
                name = name+' '+dataValue("participantLastName")(state);
              }
              return name+' '+hhNumber+'-'+farmerNumber;
            },
            "n0:TNS_Id": dataValue("tnsId")(state),
            "n0:Parent_Id": dataValue("trainingGroupId")(state)
          },
          "n0:index": {
            "n0:parent" : {
              "@": {
                "case_type": "coffee-ke-training-group"
              },
              "#": dataValue("trainingGroupId")(state)
            }
          }
        };
      }),
      field("n1:meta", function(state) {
        return {
          "@": {
            "xmlns:n1": "http://openrosa.org/jr/xforms"
          },
          "n1:deviceID": "867066029216796",
          "n1:timeStart": new Date().toISOString(),
          "n1:timeEnd": new Date().toISOString(),
          "n1:username": "api",
          "n1:userID": "e926526fc13b126fffdb6d001f25b269"
        };
      })
    )
  )
);

//Version Control