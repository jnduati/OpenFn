// Here, we make sure CommCare gives us an array to use in each(merge(...), ...)
alterState((state) => {
  let presentClients = state.data.form.Present_Clients;
  if (!Array.isArray(presentClients)) {
    presentClients = state.data.form.Present_Clients.split(" ");
  }
  console.log(presentClients);
  return state;
});

each(
  "$.data.form.Present_Clients[*]",
  submit(
    fields(
      field("@", function(state) {
        return {
          "xmlns:jrm": "http://dev.commcarehq.org/jr/xforms",
          "xmlns": "http://openrosa.org/formdesigner/22A693D2-7F34-4B8D-AE12-8A4A57C8868F",
          "uiVersion": "1",
          "version": "325",
          "name": "New Attendance",
        };
      }),
      field("Date", dataValue("form.Date")),
      field("Training_Module", dataValue("form.Training_Module")),
      field("GPS_Coordinates", (state) => {
        // define this once, it's constant...
        const coords = state.data.form.GPS_Coordinates;
        // write your contional
        if (coords) {
          return coords;
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field("Photo_URL", dataValue("form.Photo")),
      field("Signature_URL", dataValue("form.Trainer_Signature")),
      
      field("n0:case", function(state) {
        return {
          "@": {
            "case_id": dataValue("form.Present_Clients[*]")(state) + dataValue("id")(state),
            "date_modified": new Date().toISOString(),
            "user_id": "e926526fc13b126fffdb6d001f25b269",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
          "n0:create": {
            "n0:case_name": dataValue("form.Training_Module")(state),
            "n0:owner_id": "e926526fc13b126fffdb6d001f25b269",
            "n0:case_type": "zAttendance"
          },
          "n0:update": {
            "n0:Client": dataValue("form.Present_Clients[*]")(state),
            "n0:Date": dataValue("form.Date"),
            "n0:Photo_URL": dataValue("form.Photo")(state),
            "n0:Signature_URL": dataValue("form.Trainer_Signature")(state),
            "n0:GPS_Coordinates": (state) => {
              // define this once, it's constant...
              const coords = state.data.form.GPS_Coordinates;
              // write your contional
              if (coords) {
                return coords;
              }
              // the 'else' is unnecessary, return '' if there are no coords
              return '';
            },
          },
          "n0:index": {
            "n0:parent" : {
              "@": {
                "case_type": "zTrainingGroup"
              },
              "#": dataValue("form.case.@case_id")(state)
            }
          }
        };
      }),
      field("n1:meta", function(state) {
        return {
          "@": {
            "xmlns:n1": "http://openrosa.org/jr/xforms"
          },
          "n1:deviceID": "0",
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