

import { Link } from 'react-router-dom'

const BlogCard = (props: any) => {

  const { id, title, description, date, image} = props;

  return (
      <div className="blog-card box-shadow">
        <div className="card-image">
          <img src={image} className='img-fluid w-100' alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{title}</h5>
          <p dangerouslySetInnerHTML={{ __html:description?.substr(0, 70) + " ...."}} className="desc"></p>
          <Link to={"/blog/" + id}  className='button'>Read More</Link>
        </div>
      </div>
  )
}

export default BlogCard