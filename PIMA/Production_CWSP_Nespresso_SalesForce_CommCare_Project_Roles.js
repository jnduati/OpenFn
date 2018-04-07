//Project Roles Job = CWSP

each(
  "$.data.projectRoles[*]",
  submit(
    fields(
      field("@", function(state) {
        return {
          "name": "New Project Role",
          "uiVersion": "1",
          "version": "1",
          "xmlns": "http://openrosa.org/formdesigner/332E700A-B5AC-4A20-8A8B-82CFD6DED9A7",
          "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms"
        };
      }),
      field("Name", function(state){
        var name = '';
        if(dataValue("staffName")(state) !== null) {
          name = dataValue("staffName")(state);
        }
        return name;
      }),
      field("TNS_Id", dataValue("tnsId")),
      field("City", dataValue("locationName")),
      field("Role", dataValue("roleForCommCare")),
      field("Case_Id", dataValue("commCareCaseId")),
      field("Salesforce_Staff_Id", dataValue("staffId")),
      field("Project", dataValue("projectUniqueId")),
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
              if(dataValue("staffName")(state) !== null) {
                name = dataValue("staffName")(state);
              }
              return name;
            },
            "n0:owner_id": dataValue("ccMobileWorkerGroupId")(state),
            "n0:case_type": "cwsp_et_staff"
          },
          "n0:update": {
            "n0:Case_Id": dataValue("commCareCaseId")(state),
            "n0:Role": dataValue("roleForCommCare")(state),
            "n0:City": dataValue("locationName")(state),
            "n0:TNS_Id": dataValue("tnsId")(state),
            "n0:Salesforce_Staff_Id": dataValue("staffId")(state),
            "n0:Project": dataValue("projectUniqueId")(state),
          }
        };
      }),
      field("n1:meta", function(state) {
        return {
          "@": {"xmlns:n1": "http://openrosa.org/jr/xforms"},
          "n1:deviceID": "tiny_little_openfn_robots_with_impeccable_moustaches",
          "n1:timeStart": new Date().toISOString(),
          "n1:timeEnd": new Date().toISOString(),
          "n1:username": "api",
          "n1:userID": "e926526fc13b126fffdb6d001f25b269"
        };
      })
    )
  )
);
