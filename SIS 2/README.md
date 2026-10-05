# sis 2 - my tasks

just a small task manager for my vue practice. it uses vue 2 with `data`, `methods`, `computed` and `watch`.

## run it

open a terminal in this folder:

```sh
npm install
npm run serve
```

open the address from the terminal, usually http://localhost:8081. if the packages are already installed, just run `npm run serve`. press `ctrl+c` to stop it.

to build:

```sh
npm run build
```

## what it does

- add a task with a title, description and priority
- edit it, or cancel if you change your mind
- mark it as done and bring it back to active
- change priority right in the task card
- delete tasks
- search by title and use both filters at once
- count total, active and completed tasks
- keep tasks after a refresh using browser storage

the numbers count all tasks, even when a filter hides some of them. saved tasks stay in the same browser on the same site address.

## where things are

- `src/main.js` starts the app and registers the shared panel
- `src/App.vue` has the form, filters, list and task methods
- `src/components/TaskItem.vue` shows one task
- `src/components/AppPanel.vue` is the shared box with a heading and a slot
- `src/style.css` handles the layout and the meme wallpaper
- `src/assets/todo-meme.png` is the cat in the background
- `public/index.html` is the page where vue mounts the app

## quick notes on the code

`data()` holds the values the app needs. `tasks` is the list, and `title`, `description` and `priority` are the form fields. `this.tasks` means the task list in this component.

`v-model` connects an input to a value. type in the title field and `title` changes too.

`methods` contains the actions. `saveTask` adds or updates a task, `deleteTask` removes it, and `toggleTask` switches its status. most of the work is just loops and conditions.

`@submit.prevent` runs the save method without reloading the page. `@click` handles a button click.

`v-for` shows a task component for each task. `:key` uses the task id so vue can tell them apart.

`props` pass a task from the main component to the task card. the card sends events back with `$emit`. for example, clicking delete sends the task id to the parent, and the parent removes it.

`computed` calculates values from the current data. `filteredTasks` picks the tasks that match the search and filters. `completedCount` and `activeCount` update the numbers.

`watch` saves the tasks when they change. `deep: true` also catches changes inside a task, like its priority.

`created()` loads saved tasks when the component starts. `mounted()` focuses the title input once it exists on the page. these are the two lifecycle hooks.

`slot` is the space inside the shared panel. the same panel can hold the form, statistics or task list.

the panel is a global component, registered once in the entry file. the task card is registered locally in the main component.

when `editingId` is `null`, the form adds a new task. when it holds an id, the form updates that task. editing uses separate form values, so cancel leaves the task alone.

## sis requirements

| requirement | where it is |
| --- | --- |
| task list and reusable task cards | `v-for` and the task component |
| title, description, date, status and priority | each task card |
| add, edit, complete and delete | form and task buttons |
| search and filters | `filteredTasks` |
| change priority | the dropdown in each card |
| statistics | total, active and done counts |
| props and custom events | task prop and `$emit` |
| methods | task actions in the main component |
| computed properties | filtered list, counts and formatted date |
| watcher | the deep watcher on `tasks` |
| two lifecycle hooks | `created` and `mounted` |
| slots | the shared panel |
| global component | the panel registration in the entry file |

## try it out

1. add two tasks with different priorities.
2. mark one as done, then make it active again.
3. edit a task. also try canceling an edit.
4. search for part of a title and combine the filters.
5. change a priority and refresh. it should still be saved.
6. delete everything and check the empty message.

the assignment asks for the project in a git repo. include the source files, the image, `package.json` and `package-lock.json`. `node_modules`, `dist` and local test files are ignored.

vue docs: [components](https://v2.vuejs.org/v2/guide/components.html), [computed and watch](https://v2.vuejs.org/v2/guide/computed.html), [lifecycle hooks](https://v2.vuejs.org/v2/guide/instance.html).
