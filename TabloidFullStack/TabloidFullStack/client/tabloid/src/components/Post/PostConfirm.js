import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../Managers/PostManager";

export const PostApprovalConfirm = () => {
    const [post, setPost] = useState(null);
    const {id: postId} = useParams();
    const location = useLocation();
    const isDisapproving = location.pathname.includes("disapprove")

    const navigate = useNavigate();
    
    useEffect(() => {
        if(postId) callGetPost();
    }, [postId])

    const callGetPost = async () => {
        const post = await getPostById(postId)
        setPost(post)
    };
    const ApprovePost = (event) => {
        event.preventDefault()
        post.isApproved = true;
        console.log(post);
        const changedPost = {
            id: Number(postId),
      title: post.title,
      content: post.content,
      imageLocation: "default.jpg",
      createDateTime: new Date().toISOString(),
      publishDateTime: new Date().toISOString(),
      isApproved: post.isApproved,
      categoryId: post.categoryId,
      category: {
        id: post.categoryId,
        name:
          post?.category?.name,
      },
      userProfileId: post?.author?.id,
      author: {
        id: post.author.id,
        firstName: post.author.firstName || "string",
        lastName: post.author.lastName || "string",
        displayName: post.author.displayName || "string",
        email: post.author.email || "user@example.com",
        createDateTime: post.author.createDateTime || new Date().toISOString(),
        imageLocation: post.author.imageLocation || "default.jpg",
        userTypeId: post.author.userTypeId,
        userType: {
          id: post.author.userTypeId,
          name: post.author.userType?.name || "string",
        },
      },
        }
        updatePost(changedPost).then(() => {
            navigate("/approval")
        })
    }
    const disapprovePost = (event) => {
        event.preventDefault()
        post.isApproved = false;
        console.log(post);
        const changedPost = {
            id: Number(postId),
      title: post.title,
      content: post.content,
      imageLocation: "default.jpg",
      createDateTime: new Date().toISOString(),
      publishDateTime: new Date().toISOString(),
      isApproved: post.isApproved,
      categoryId: post.categoryId,
      category: {
        id: post.categoryId,
        name:
          post?.category?.name,
      },
      userProfileId: post?.author?.id,
      author: {
        id: post.author.id,
        firstName: post.author.firstName || "string",
        lastName: post.author.lastName || "string",
        displayName: post.author.displayName || "string",
        email: post.author.email || "user@example.com",
        createDateTime: post.author.createDateTime || new Date().toISOString(),
        imageLocation: post.author.imageLocation || "default.jpg",
        userTypeId: post.author.userTypeId,
        userType: {
          id: post.author.userTypeId,
          name: post.author.userType?.name || "string",
        },
      },
        }
        updatePost(changedPost).then(() => {
            navigate("/approval")
        })
    }
    return (
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "6rem",
      }}
    >
      <h2>{isDisapproving ? "Disapprove" : "Approve"} post</h2>
      <p>
        Are you sure you want to {isDisapproving ? "disapprove" : "approve"}{" "}
        this post?
      </p>
      <div className="d-flex flex-column gap-1 my-4">
        <p><strong>Author: </strong> {post?.author?.displayName} </p>
        <p>
          <strong>Created On:</strong>{" "}
          {post?.createDateTime}
          
        </p>
        <p><strong>Category: </strong> {post?.category.name}</p>
        <p>
          <strong>Title: </strong> {post?.title}
        </p>
        <p><strong>Content:</strong> {post?.content}</p>
      </div>
      <div className="d-flex flex-row gap-3 justify-content-start">
        <Link to="/profiles" className="btn btn-secondary">
          Cancel
        </Link>
        {isDisapproving ? (
            <button
            onClick={disapprovePost}
            className="btn btn-danger"
          >
            Disapprove
          </button>
          
        ) : (
            <button
            onClick={ApprovePost}
            className="btn btn-success"
          >
            Approve
          </button>
        )}
      </div>
    </div>
    )
}