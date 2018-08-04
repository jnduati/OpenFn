alterState(state => {
  // Split the space-separated string into an array of IDs.
  const clientArray = state.data.form.Present_Clients.split(" ");
  state.presentClients = clientArray.map(c => ({id: c, parentData: state.data}));
  return state;
})

each(
  "$.presentClients[*]",
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
      field("Date", dataValue("parentData.form.Date")),
      field("Training_Module", dataValue("parentData.form.Training_Module")),
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
      field("Photo_URL", dataValue("parentData.form.Photo")),
      field("Signature_URL", dataValue("parentData.form.Trainer_Signature")),
      
      field("n0:case", function(state) {
        return {
          "@": {
            "case_id": state.data.id,
            "date_modified": new Date().toISOString(),
            "user_id": "e926526fc13b126fffdb6d001f25b269",
            "xmlns:n0": "http://commcarehq.org/case/transaction/v2"
          },
          "n0:create": {
            "n0:case_name": dataValue("parentData.form.Training_Module")(state),
            "n0:owner_id": "e926526fc13b126fffdb6d001f25b269",
            "n0:case_type": "zAttendance"
          },
          "n0:update": {
            "n0:Client": state.data.id,
            "n0:Date": dataValue("parentData.form.Date"),
            "n0:Photo_URL": dataValue("parentData.form.Photo")(state),
            "n0:Signature_URL": dataValue("parentData.form.Trainer_Signature")(state),
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
              "#": dataValue("parentData.form.case.@case_id")(state)
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
