import AttractionView from '@/views/AttractionView.vue'
import AttractionList from '@/components/attraction/AttractionList.vue'

const attractionRouter = [
  {
    path: '/attraction',
    name: 'attraction',
    component: AttractionView,
    redirect: { name: 'attraction-list' },
    children: [
      {
        path: 'list',
        name: 'attraction-list',
        component: AttractionList
      },
    ]
  }
]

export default attractionRouter
