import Link from 'next/link';
import Head from 'next/head';
//
export default function TopHeadBox(props){
  var site_name = props.site_name
  return (
  <div className="main_title_wrap bg-gray-400">
    <div className="div_img_layer text-center py-8 text-white">
      <h1 className="text-5xl font-bold">{site_name}<br />
      </h1>
      <p className="sub_title m-4">{props.info_text}
        <br />
      </p>
    </div>
  </div>
  );
}
