import AttractionView from '@/views/AttractionView.vue'
import AttractionList from '@/components/attraction/AttractionList.vue'
import AttractionListView from "@/views/AttractionListView.vue";

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
        component: AttractionListView
      },
    ]
  }
]

export default attractionRouter
