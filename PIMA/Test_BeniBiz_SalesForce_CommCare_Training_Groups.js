each(
  "$.data.trainingGroups[*]",
  submit(
    fields(
      field("@", function(state) {
        return {
          "name": "New Training Group",
          "uiVersion": "1",
          "version": "124",
          "xmlns": "http://openrosa.org/formdesigner/a8bbd1d8894ae4cec8e816802101a135cc469e04",
          "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms"
        };
      }),
      field("Name", dataValue("trainingGroupName")),
      //field("TNS_Id", dataValue("tnsId")),
      field("Location", dataValue("locationName")),
      field("Track", dataValue("type")),
      field("Department", dataValue("description")),
      field("Commune", dataValue("market")),
      //field("Male_Guest_Attendance", dataValue("maleGuestAttendance")),
      // field("Name_Id_Concat", function(state) {
      //   return (
      //     dataValue("trainingGroupName")(state)+' '+dataValue("tnsId")(state)
      //   );
      // }),
      field("Parent_Id", dataValue("staffId")),
      field("n0:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("trainingGroupId")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e926526fc13b126fffdb6d001f25b269",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
          "n0:create": {
            "n0:case_name": dataValue("trainingGroupName")(state),
            "n0:owner_id": dataValue("ccMobileWorkerGroupId")(state),
            "n0:case_type": "benibiz_training_group"
          },
          "n0:update": {
            "n0:Location": dataValue("locationName")(state),
            "n0:Track": dataValue("type")(state),
            "n0:Cohort": dataValue("measurementGroup")(state),
            "n0:Department": dataValue("description")(state),
            "n0:Commune": dataValue("market")(state),
            // "n0:Male_Guest_Attendance": dataValue("maleGuestAttendance")(state),
            //"n0:Market": dataValue("market")(state),
            // "n0:Name_Id_Concat": function(){
            //   var name = dataValue("trainingGroupName")(state)+' '+dataValue("tnsId")(state);
            //   return name;
            // },
            "n0:Parent_Id": dataValue("staffId")(state),
            //"n0:TNS_Id": dataValue("tnsId")(state)
          },
          "n0:index": {
            "n0:parent" : {
              "@": {
                "case_type": "benibiz_staff"
              },
              "#": dataValue("staffId")(state)
            }
          }
        };
      }),
      field("n1:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("trainingGroupId")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "f1ffc61aa02f30f7c078ddc5a95f48a9",
            "xmlns:n1": "http://commcarehq.org/case/transaction/v2"
          }
        };
      }),
      field("n2:meta", function(state) {
        return {
          "@": {
            "xmlns:n2": "http://openrosa.org/jr/xforms"
          },
          "n2:deviceID": "867066029216796",
          "n2:timeStart": new Date().toISOString(),
          "n2:timeEnd": new Date().toISOString(),
          "n2:username": "api",
          "n2:userID": "e926526fc13b126fffdb6d001f25b269"
        };
      })
    )
  )
);
