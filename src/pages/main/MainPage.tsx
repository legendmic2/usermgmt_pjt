import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../../app-context";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/Cookie";
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

const sections = [
  { title: "인기", url: "#" },
  { title: "팔로잉", url: "#" },
  { title: "사진", url: "#" },
  { title: "집들이", url: "#" },
  { title: "노하우", url: "#" },
  { title: "전문가집들이", url: "#" },
  { title: "질문과답변", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

const mainFeaturedPost = {
  title: "내일은 더 나은 집에서 살 수 있겠죠?",
  description:
    "우리는 오늘만 사는 사람이 아니기에, 내일을 위한 집을 제공합니다.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "누르지마세요..",
};

// const featuredPosts = [
//     {
//         title: '상품1',
//         date: 'Nov 12',
//         description: '이건 짱짱 상품입니다.',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//     },
//     {
//         title: '상품2',
//         date: 'Nov 11',
//         description: '이건 덜 짱짱 상품입니다.',
//         image: 'https://source.unsplash.com/random',
//         imageLabel: 'Image Text',
//     },
// ]

const featuredPosts = {
  title: "상품1",
  date: "Nov 12",
  description: "이건 짱짱 상품입니다.",
  image: "https://source.unsplash.com/random",
  imageLabel: "Image Text",
};

const theme = createTheme();

export const MainPage = observer(() => {
  const { api, store } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const loginUserFetch = async () => {
    try {
      setLoading(true);
      await api.user.loginUserGet();
    } finally {
      setLoading(false);
      if (!store.user.loginUserInfo) {
        alert(
          "Login User의 정보를 받아오는데 실패하였습니다. Login page로 이동합니다."
        );
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    // access token이 없을 경우엔 login page로 강제 routing
    if (!getCookie("accessToken")) {
      alert("먼저 로그인 해주세요.");
      navigate("/login");
    } else loginUserFetch();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {/*최상단*/}
        <Header title="User Management" />
        <main>
          <FeaturedPost
            key={featuredPosts.title}
            post={store.user.loginUserInfo}
          />
        </main>
      </Container>
      <Footer
        title="User Management Toy Project"
        description="프론트 공부를 위해 만들었습니다."
      />
    </ThemeProvider>
  );
});

export default MainPage;
