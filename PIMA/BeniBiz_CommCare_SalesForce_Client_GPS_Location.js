
each(
  "$.data",
  upsert("Participant__c", "CommCare_Case_Id__c",
    fields(
      field("CommCare_Case_Id__c", dataValue("form.case.@case_id")),
      field('GPS_Coordinates__Latitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.geocoordinate;
        // write your contional
        if (coords) {
          return coords.split(" ")[0];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      }),
      field('GPS_Coordinates__Longitude__s', (state) => {
        // define this once, it's constant...
        const coords = state.data.form.geocoordinate;
        // write your contional
        if (coords) {
          return coords.split(" ")[1];
        }
        // the 'else' is unnecessary, return '' if there are no coords
        return '';
      })
      )
    )
  );
