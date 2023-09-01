import { PostProps } from '../../components/Post';
import { GetServerSideProps } from 'next';
import getPostById from '@/services/api/getPostById';

import FormPost from '@/components/FormPost';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id as string | number;

  const post = await getPostById(postId);

  if (post) {
    return {
      props: post,
    };
  } else {
    return {
      props: {},
    };
  }
};

const EditForm: React.FC<PostProps> = (props) => {
  return (
    < FormPost
      {...props} >
    </FormPost >
  )
}

export default EditForm;