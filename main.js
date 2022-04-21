const menuLink = document.querySelectorAll(".menu-link");
const topLinks = document.querySelector(".input_box_double");
const alert = document.querySelector(".alert");
const dropList = document.querySelector(".main_con");
const checkbox = document.querySelector(".drop-down-check");
const chev = document.querySelector(".chev");
const json = document.querySelector(".json");


let obj = {}; // to store the json generated from selected items

menuLink.forEach(function (item) {
  // add item
  item.addEventListener("click", function () {
    // if item doesnt contain class, add. Else, already added
    if (!item.classList.contains("added")) {
      item.classList.add("added");

      topLinks.innerHTML += `
            <div class="input dflex" data-id=${item.getAttribute("id")}>
              <p>${item.textContent}</p>
              <p></p>
              <div class="cancel-btn dflex">
                <p><strong>&times;</strong></p>
              </div>
            </div>`;

      displayAlert("item added", "success");

      
      // add the item to the json array
      obj[`${item.getAttribute("id")}`] = `${item.textContent}`;
      
      let jsonDoc = JSON.stringify(obj);
      json.textContent = jsonDoc;
      console.log(json.textContent);


      //remove added item
      const cancelBtn = topLinks.querySelectorAll(".cancel-btn");
      cancelBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {
          menuLink.forEach(function (link) {
            // compare the id and data-id to remove the added class
            if (link.getAttribute("id") == btn.parentElement.dataset.id) {
              link.classList.remove("added");
            }
          });

          delete obj[btn.parentElement.dataset.id];

          let jsonDoc = JSON.stringify(obj);
          json.textContent = jsonDoc;
          console.log(json.textContent);

          const cont = btn.parentElement.parentElement;
          // cont.removeChild(btn.parentElement);
          btn.parentNode.style.display = 'none';

          displayAlert("item removed", "danger");
        });
      });
    } else {
      displayAlert("item already added", "danger");
    }
  });
});

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // remove alert after 1s
  setTimeout(function () {
    alert.classList.remove(`alert-${action}`);
  }, 700);
}

//close the menu when there's a click outside the container
window.addEventListener("click", function (e) {
  if (document.getElementById("main-con").contains(e.target) && e.target != chev) {
    // Clicked in box
    checkbox.checked = true;
  } else if (e.target == chev) {
    checkbox.checked = !checkbox.checked;
  } else {
    // Clicked outside the box
    checkbox.checked = false;
  }
});