import { ToastContainer } from "react-toastify";
import AddPost from "../components/PostsForms/AddPost";
import PostList from "../components/PostsForms/PostList";

function DashboardPage() {
  return (
    <div>
      <AddPost />
      <PostList />
      <ToastContainer />
    </div>
  );
}

export default DashboardPage;
