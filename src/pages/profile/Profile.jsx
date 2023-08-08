import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../context/authState"; // Update the path to your authState.js
import * as S from "./style";
import Banner from "../../components/common/banner/Banner";
import MyPageUser from "../../assets/images/icon/mypageUserIcon.png";
import MypageSetting from "../../assets/images/icon/mypageSetting.png";
import MypageStar from "../../assets/images/icon/mypageStar.png";
import MypageChat from "../../assets/images/icon/mypageChat.png";
import MypageVector from "../../assets/images/icon/mypageVector.png";
import AuthContentBox from "../../components/auths/authContentBox/AuthContentBox";

function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃
    setUserInfo(null);

    // 로컬 스토리지에서 로그인 정보 삭제
    localStorage.removeItem("userInfo");

    // 로그인 페이지로 이동
    navigate("/");

    // // 페이지 새로고침
    // window.location.reload();
  };

  return (
    <S.ProfileWrapper>
      <Banner
        titleKorean="마이페이지"
        titleEnglish="MyPage"
        image={<S.MypageBookImg />}
      />

      <S.ProfileInfoWrapper>
        {/* 프로필 헤더  */}
        <S.ProfileInfoHeaderWrapper>
          <S.ProfileInfoHeaderTitle>
            <S.myPageUserIcon src={MyPageUser} />
            <S.ProfileInfoHeaderTitleName>
              {userInfo && userInfo.email}
            </S.ProfileInfoHeaderTitleName>
            님의 마이페이지
          </S.ProfileInfoHeaderTitle>
          <S.ProfileInfoHeaderButton onClick={handleLogout}>
            로그아웃
          </S.ProfileInfoHeaderButton>
        </S.ProfileInfoHeaderWrapper>
        {/* 프로필 내용물 박스  */}
        <S.ProfileInfoContentWrapper>
          <AuthContentBox content="즐겨찾기" img={MypageStar} />
          <AuthContentBox content="작성한 게시물" img={MypageVector} />
          <AuthContentBox content="댓글 단 게시물" img={MypageChat} />
          <AuthContentBox content="정보수정" img={MypageSetting} />
        </S.ProfileInfoContentWrapper>
        탈퇴
      </S.ProfileInfoWrapper>
    </S.ProfileWrapper>
  );
}

export default Profile;
