import React, { useState, useEffect } from "react";
import * as S from "./style";

import AiServiceList from "../../components/common/aiServiceList/AiServiceList";
import MainBannerList from "../../components/main/mainBanner/MainBannerList";
import MainCategory from "../../components/main/mainCategory/MainCategory";
import Selector from "../../components/common/selector/Selector";

import { AiOutlineSearch } from "react-icons/ai";
import SearchForm from "../../components/common/searchForm/SearchForm";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Main() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const getCurrentPage = currentPage => setCurrentPage(currentPage);

  const categoriesJob = {
    title: "직업군",
    tags: [
      "전체",
      "IT",
      "디자인",
      "교육",
      "마케팅",
      "연구",
      "금융",
      "학생",
      "서현",
      "유진",
      "기타"
    ]
  };
  const [currentCategoryTagJob, setCurrentCategoryTagJob] = useState(0);
  const getCurrentCategoryTagJob = tag => {
    setCurrentCategoryTagJob(tag);
  };

  const categoriesKeyword = {
    title: "키워드",
    tags: [
      "전체",
      "챗봇",
      "개발",
      "디자인",
      "영상",
      "마케팅",
      "분석",
      "음성",
      "언어",
      "유료",
      "무료"
    ]
  };
  const [currentCategoryTagKeyword, setCurrentCategoryTagKeyword] = useState(0);
  const getCurrentCategoryTagKeyword = tag => {
    setCurrentCategoryTagKeyword(tag);
  };

  // 페이지가 로드될 때 실행되는 함수
  const checkFirstVisit = () => {
    // localStorage에서 isFirst 값을 가져옴
    const isFirstVisit = localStorage.getItem("isFirst");

    if (!isFirstVisit) {
      // isFirst 값이 없으면(처음 들어오는 유저라면) 처리
      localStorage.setItem("isFirst", "true"); // isFirst 값을 저장
      navigate("/about"); // '/about' 페이지로 이동
    }
  };

  // 페이지 로드될 때 checkFirstVisit 함수 실행
  window.onload = checkFirstVisit;

  const SelectorOption = [
    { value: "recent", title: "최신순" },
    { value: "popular", title: "조회순" },
    { value: "like", title: "좋아요순" },
    { value: "rating", title: "평점순" }
  ];
  const [currentOption, setCurrentOption] = useState("recent");
  const getCurrentOption = option => {
    setCurrentOption(option);
  };

  const fetchData = async () => {
    try {
      let Api_Url = "";
      if (currentCategoryTagJob != 0 && currentCategoryTagKeyword != 0) {
        //job keyword 선택된경우
        Api_Url = `/moin?job=${categoriesJob.tags[currentCategoryTagJob]}&keyword=${categoriesKeyword.tags[currentCategoryTagKeyword]}&ordering=${currentOption}&page=${currentPage}`;
      } else if (currentCategoryTagJob != 0 && currentCategoryTagKeyword == 0) {
        //job 선택된경우
        Api_Url = `/moin?job=${categoriesJob.tags[currentCategoryTagJob]}&ordering=${currentOption}&page=${currentPage}`;
      } else if (currentCategoryTagJob == 0 && currentCategoryTagKeyword != 0) {
        //keyword 선택된경우
        Api_Url = `/moin?keyword=${categoriesKeyword.tags[currentCategoryTagKeyword]}&ordering=${currentOption}&page=${currentPage}`;
      } else if (currentCategoryTagJob == 0 && currentCategoryTagKeyword == 0) {
        //job keyword 선택 안 된 경우
        Api_Url = `/moin?page=${currentPage}&ordering=${currentOption}`;
      }

      const response = await axios.get(Api_Url);

      setCount(response.data.count);
      setData(response.data.results.slice(0, response.data.results.length));
    } catch (e) {
      console.log(e);
    }
  };

  // 유저체크
  useEffect(() => {
    checkFirstVisit();
  }, []);

  //옵션, 카테고리 변경
  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [currentOption, currentCategoryTagJob, currentCategoryTagKeyword]);

  //페이지변경
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <>
      <MainBannerList />

      <S.MainWrapper>
        <SearchForm />
        {/* 직군 카테고리 */}
        <MainCategory
          category={categoriesJob}
          currentCategoryTag={currentCategoryTagJob}
          getCurrentCategoryTag={getCurrentCategoryTagJob}
        />
        {/* 키워드 카테고리 */}
        <MainCategory
          category={categoriesKeyword}
          currentCategoryTag={currentCategoryTagKeyword}
          getCurrentCategoryTag={getCurrentCategoryTagKeyword}
        />
        <S.MainTitleWrapper>
          <S.MainTitle>
            <AiOutlineSearch size={"25px"} style={{ marginRight: "5px" }} />{" "}
            모아보기
          </S.MainTitle>
          <Selector
            options={SelectorOption}
            getCurrentOption={getCurrentOption}
          />
        </S.MainTitleWrapper>

        <AiServiceList
          data={data}
          count={count}
          currentPage={currentPage}
          getCurrentPage={getCurrentPage}
        />
      </S.MainWrapper>
    </>
  );
}

export default Main;
