import FormPost from '@/components/FormPost';
import { PostProps } from '@/components/Post';

const CreateForm: React.FC<PostProps> = (props) => {
  return (
    < FormPost
      {...props} >
    </FormPost >
  )
}

export default CreateForm;