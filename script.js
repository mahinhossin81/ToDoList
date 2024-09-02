
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
//add an eventListener to the from
const form = document.querySelector("#itemForm"); // select form
const itemInput = document.querySelector("#itemInput"); // select input box from form
const itemList = document.querySelector(".item-list");
const feedback = document.querySelector(".feedback");
const addBtn = document.querySelector("#add-item");
const clearButton = document.querySelector("#clear-list");
 
const bootstrap = document.head.querySelector(
  "link[href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css']"
);
const tailwindCSS = document.head.querySelector(
  "script[src='https://cdn.tailwindcss.com']"
);
 
tailwindCSS && console.log("Tailwind CSS is loaded");
 
let todoItems = [];
 
// TODO: Handle item
const handleItem = function (itemName) {
  const items = itemList.querySelectorAll(".item");
 
  items.forEach((item) => {
    // ! To avoid the error of the item name being undefined
    if (
      item.querySelector(".item-name").textContent.trim().toLowerCase() ===
      itemName.trim().toLowerCase()
    ) {
      //TODO: Complete event listener
 
      item
        .querySelector(".complete-item")
        .addEventListener("click", function () {
          let itemText = item.querySelector(".item-name");
          let itemIndex = item.querySelector(".item-index");
          console.log(itemText);
          itemText.classList.toggle("completed");
          itemIndex.classList.toggle("completed");
          // CSS
          if (bootstrap) {
            // Bootstrap classes
            itemText.classList.toggle("text-decoration-line-through");
            itemText.classList.toggle("text-secondary");
            itemIndex.classList.toggle("border-success-subtle");
            itemIndex.classList.toggle("text-secondary");
          } else if (tailwindCSS) {
            // Tailwind CSS classes
            itemText.classList.toggle("line-through");
            itemText.classList.toggle("text-slate-400");
            itemIndex.classList.toggle("border-green-500");
            itemIndex.classList.toggle("text-slate-400");
          }
 
          if (itemText.classList.contains("completed")) {
            sendFeedback(
              `Item Completed`,
              `${bootstrap ? "success" : "green"}`
            );
          }
        });
      //TODO: Edit event listener
      item.querySelector(".edit-item").addEventListener("click", function () {
        addBtn.innerHTML = "Edit Item";
        itemInput.value = itemName;
        itemList.removeChild(item);
 
        todoItems = todoItems.filter((item) => {
          return item !== itemName;
        });
        setLocalStorage(todoItems);
      });
      //TODO: Delete event listener
      item.querySelector(".delete-item").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this item?")) {
          itemList.removeChild(item);
 
          todoItems = todoItems.filter(function (item) {
            return item !== itemName;
          });
          setLocalStorage(todoItems);
          sendFeedback("Item deleted", `${bootstrap ? "danger" : "red"}`);
        } else {
          return;
        }
      });
    }
  });
};
 
//TODO: Get List
const getList = function (todoItems) {
  itemList.innerHTML = "";
 
  todoItems.forEach(function (item, index) {
    if (bootstrap) {
      itemList.insertAdjacentHTML(
        "beforeend",
        `<div class="item my-3 d-flex justify-content-between align-items-center border-bottom border-success-subtle">
          <div class="d-flex gap-1">
            <h6 class="item-index border border-success-subtle  rounded p-1">${index}</h6>
            <p class="item-name text-capitalize">${item}</p>
          </div>
          <div class="item-icons" >
            <i class="far fa-check-circle complete-item mx-2 item-icon text-success"></i>
            <i class="far fa-edit edit-item mx-2 item-icon text-secondary"></i>
            <i class="far fa-times-circle delete-item item-icon text-danger"></i>
          </div>
      </div>`
      );
    } else if (tailwindCSS) {
      itemList.insertAdjacentHTML(
        "beforeend",
        `<div class="item flex justify-between my-3 border-b border-b-sky-700 pb-1">
          <div class="flex gap-1 items-center">
            <h6 class="item-index border border-sky-700 rounded p-1">${index}</h6>
            <p class="item-name capitalize">${item}</p>
          </div>
            <div class="item-icons">
              <i class="far fa-check-circle cursor-pointer complete-item mx-2 item-icon text-sky-700"></i>
              <i class="far fa-edit cursor-pointer edit-item mx-2 item-icon"></i>
              <i class="far fa-times-circle cursor-pointer delete-item item-icon text-red-500"></i>
            </div>
         </div>`
      );
    } else {
      itemList.insertAdjacentHTML(
        "beforeend",
        `<div class="item">
            <div class="item-info">
              <h6 class="item-index">
                ${index} 
              </h6>
              <p class="item-name">
                ${item}
              </p>
            </div>
            <div class="item-icons">
              <i class="far fa-check-circle complete-item"></i>
              <i class="far fa-edit edit-item"></i>
              <i class="far fa-times-circle delete-item"></i>
            </div>
          </div>`
      );
    }
    handleItem(item);
  });
};
 
//TODO: Get Local Storage
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoItems");
  if (todoStorage === "undefined" || todoStorage === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
    getList(todoItems);
  }
};
 
//TODO: Set Local Storage
const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};
 
// get local storage from page
getLocalStorage();
 
//TODO: add an item to the List, including to local storage
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemName = itemInput.value;
 
  if (itemName.length === 0) {
    sendFeedback("Please Enter Valid Value", `${bootstrap ? "danger" : "red"}`);
  } else {
    addBtn.innerHTML = "Add Item";
    todoItems.push(itemName);
    setLocalStorage(todoItems);
    getList(todoItems);
    sendFeedback(
      "Item added to the list",
      `${bootstrap ? "success" : "green"}`
    );
  }
 
  itemInput.value = "";
});
 
//TODO: clear all items from the list
clearButton.addEventListener("click", function () {
  confirm("Are you sure you want to clear the list?")
    ? ((todoItems = []), localStorage.clear(), getList(todoItems))
    : null;
});
// TODO: Send feedback
function sendFeedback(text, className) {
  if (bootstrap) {
    feedback.classList.add("showItem", `alert-${className}`);
    feedback.innerHTML = text;
    setTimeout(function () {
      feedback.classList.remove("showItem", `alert-${className}`);
      feedback.innerHTML = "Write value for item";
    }, 3000);
  } else if (tailwindCSS) {
    feedback.classList.add(
      "border",
      `bg-${className}-100`,
      `text-${className}-700`
    );
    feedback.innerHTML = text;
    setTimeout(function () {
      feedback.classList.remove(
        "border",
        `bg-${className}-100`,
        `text-${className}-700`
      );
      feedback.innerHTML = "Write value for item";
    }, 3000);
  } else {
    feedback.classList.add(`${className}`);
    feedback.innerHTML = text;
    setTimeout(function () {
      feedback.classList.remove(`${className}`);
      feedback.innerHTML = "Write value for item";
    }, 3000);
  }
}