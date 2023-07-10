
$(function () {
  function createTimeBlocks() {
    var now = dayjs();
    var currentHour = now.hour();

    var containerEl = $(".container-lg");
    containerEl.empty();

    // for loop to 9-5 based on 24hr time
  for (let hour = 9; hour <= 17; hour++) {
    let timeBlockStatus = "";
    // time block status to be determined
    if (hour < currentHour) {
        timeBlockStatus = "past";
    } else if (hour === currentHour) {
        timeBlockStatus = "present";
    } else {
        timeBlockStatus = "future";
    }

    // AM/PM code
    var hourLabel = hour > 12 ? `${hour - 12}PM` : hour === 12 ? `${hour}PM` : `${hour}AM`;
     // hour id
     var id = `hour-${hour}`;
     // checks local storage for saved data
     let description = getSavedTimeBlock(id);

     var timeBlock = `
          <div id="${id}" class="row time-block ${timeBlockStatus}">
          <div class="col-2 col-md-1 hour text-center py-3">${hourLabel}</div>
          <textarea class="col-8 col-md-10 description" rows="3">${description}</textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
          </button>
          </div>
          `;
          // adds time blockl to the container
          containerEl.append(timeBlock);
        }
        const timeRemaining = 60 - Number(now.minute());
        setTimeout(createTimeBlocks, timeRemaining * 1000 * 60);
      }
    
  
        function onSaveClick(event) {
          var saveButton = $(this);
          // id of the closest time-block
          var timeBlockId = saveButton.closest(".time-block").attr("id");
          // description value
          var description = $.trim(saveButton.siblings("textarea").val());
    
          // if the description is empty then remove it from local storage
          if (description === "") {
              localStorage.removeItem(timeBlockId);
              return;
          }
          // determines what to save
          var itemToSave = {
            description: description,
        };
        // saves to local storage
        localStorage.setItem(timeBlockId, JSON.stringify(itemToSave));
  };

  function getSavedTimeBlock(timeBlockId) {
    // pull from local storage
    var savedItem = localStorage.getItem(timeBlockId);
    // if empty return empty string otherwise return the description
    return savedItem ? JSON.parse(savedItem).description : "";
}

function setCurrentDayHeader() {
  // get the current date using dayjs
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");

  $("#currentDay").text(currentDate);
}

setCurrentDayHeader();
  createTimeBlocks();

  $(".saveBtn").on("click", onSaveClick);

});
