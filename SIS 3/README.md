# sis 3

simple post board on vue 3. posts come from jsonplaceholder through axios.

## start

```sh
npm install
npm run dev
```

open http://127.0.0.1:5174. to check the build, run `npm run build`.

## pages

- `/` home
- `/posts` all posts and title search
- `/posts/:id` one post
- `/posts/new` new post
- `/posts/:id/edit` edit post
- `/login` demo login
- anything else shows 404

the header stays on every page. creating, editing and deleting need login. any name and test email work; this is only a demo login.

## api

the app sends get, post, put and delete requests to [jsonplaceholder](https://jsonplaceholder.typicode.com/). that service fakes changes, so they disappear after a full reload. a post you just created can still be edited and deleted on the page, but those two actions are local because the new post does not exist on the server.

`src/router.js` has the routes. `src/api.js` sets up axios. `src/posts.js` handles the post list. `src/auth.js` stores the demo login. page components are in `src/views`.
