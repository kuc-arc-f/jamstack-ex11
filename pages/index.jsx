import Head from 'next/head'
import Link from 'next/link';
import Container from '../components/container'
import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import IndexRow from './IndexRow'
import LibCommon from '../lib/LibCommon'
import LibPagenate from '../lib/LibPagenate'

export default function Index(data) {
  var items = data.blogs
  var json = data.json
//console.log( items )    
  return (
    <div className="bg-gray-100">
    <Layout preview="">
      <Head>
        <title>{data.site_name}</title>
      </Head>
      <TopHeadBox site_name={data.site_name} info_text={data.info_text} />
      <Container key="Index">
        <div className="p-1">
          <h3 className="text-3xl text-blue-400 font-bold mb-0">Posts</h3>
        </div>        
        {items.map((item, index) => {
// console.log(item )
          var category_name = item.category.name
          return (
          <Link href={`/posts/${item.save_id}`} >
            <a>
              <IndexRow key={index}
              id={item.id} save_id={item.save_id} title={item.title}
              date={item.created_at} category_name={category_name} />       
            </a>
          </Link>
          )
        })}
      </Container>
    </Layout>
    </div>
  )
}

export async function getStaticProps() {
  var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
  var url = process.env.MY_JSON_URL+ '?' + dt
  const req = await fetch( url );
  const json = await req.json();  
  var items = json.items 
  items =  LibCommon.get_reverse_items(items)
  LibPagenate.init()
  items = LibPagenate.getOnepageItems(items, 0 , 20)  
//console.log(items)  
  var display = LibPagenate.is_paging_display(items.length)      
  return {
    props : {
      blogs: items,
      json: json,
      site_name : process.env.MY_SITE_NAME,
      info_text : "Sample CMSの関連記事を公開予定しております。",        
      display: display
    }
  };
}
