import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import { getCategoriesAndSubcategories } from './dataAPI';

export const handlers = [
  http.get('/fakeAPI/categories', async () => {
    const categories = await getCategoriesAndSubcategories();
    return HttpResponse.json(categories);
  }),
];

export const worker = setupWorker(...handlers);

/* MSW REST API Handlers */

// export const handlers = [
//   http.get('/fakeApi/posts', async function () {
//     const posts = db.post.getAll().map(serializePost)
//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(posts)
//   }),
//   http.post('/fakeApi/posts', async function ({ request }) {
//     const data = await request.json()

//     if (data.content === 'error') {
//       await delay(ARTIFICIAL_DELAY_MS)

//       return new HttpResponse(
//         JSON.stringify('Server error saving this post!'),
//         {
//           status: 500,
//         },
//       )
//     }

//     data.date = new Date().toISOString()

//     const user = db.user.findFirst({ where: { id: { equals: data.user } } })
//     data.user = user
//     data.reactions = db.reaction.create()

//     const post = db.post.create(data)
//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(serializePost(post))
//   }),
//   http.get('/fakeApi/posts/:postId', async function ({ params }) {
//     const post = db.post.findFirst({
//       where: { id: { equals: params.postId } },
//     })
//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(serializePost(post))
//   }),
//   http.patch('/fakeApi/posts/:postId', async ({ request, params }) => {
//     const { id, ...data } = await request.json()
//     const updatedPost = db.post.update({
//       where: { id: { equals: params.postId } },
//       data,
//     })
//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(serializePost(updatedPost))
//   }),

//   http.get('/fakeApi/posts/:postId/comments', async ({ params }) => {
//     const post = db.post.findFirst({
//       where: { id: { equals: params.postId } },
//     })

//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json({ comments: post.comments })
//   }),

//   http.post('/fakeApi/posts/:postId/reactions', async ({ request, params }) => {
//     const postId = params.postId
//     const { reaction } = await request.json()
//     const post = db.post.findFirst({
//       where: { id: { equals: postId } },
//     })

//     const updatedPost = db.post.update({
//       where: { id: { equals: postId } },
//       data: {
//         reactions: {
//           ...post.reactions,
//           [reaction]: (post.reactions[reaction] += 1),
//         },
//       },
//     })

//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(serializePost(updatedPost))
//   }),
//   http.get('/fakeApi/notifications', async () => {
//     const numNotifications = getRandomInt(1, 5)

//     let notifications = generateRandomNotifications(
//       undefined,
//       numNotifications,
//       db,
//     )

//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(notifications)
//   }),
//   http.get('/fakeApi/users', async () => {
//     await delay(ARTIFICIAL_DELAY_MS)
//     return HttpResponse.json(db.user.getAll())
//   }),
// ]

// export const worker = setupWorker(...handlers)
// worker.printHandlers() // Optional: nice for debugging to see all available route
// handlers that will be intercepted
