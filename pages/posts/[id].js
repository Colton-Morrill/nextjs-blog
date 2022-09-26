import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

import { getAllPostIds, getPostData, getIdByUsername } from '../../lib/posts';

export async function getStaticProps({ params }) {
    // Add the "await" keyword like this:
    const userId = await getIdByUsername();
    const postData = await getPostData(params.id);
    
    console.log(userId);

    
  
    return {
      props: {
        postData,
        userId
      },
    };
  }

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData, userId }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
          <meta property='og:description' content={userId.userId} />
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <p>{userId.userId}</p>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }