import React from "react";
import "./style.css";
import {
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import categories from "../../data/category";

const Header = ({
  category,
  setCategory,
  word,
  setWord,
  setMeanings,
  lightMode,
}) => {
  // 默认为黑暗主题
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? "#000" : "#fff",
      },
      mode: lightMode ? "light" : "dark",
    },
  });

  // 检测输入字符并改变 word 值
  function changeWord(input) {
    let trimedInput = input.trim();
    trimedInput.length === 0 ? setWord("") : setWord(trimedInput);
  }

  // 切换语言的同时，清除已输入的文字与其含义
  const changeCategory = (language) => {
    setCategory(language);
    setWord("");
    setMeanings([]);
  };

  return (
    <div className="header">
      <span className="title">{word ? word : "Word hunt"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          {/* 文字输入框 */}
          <TextField
            className="search"
            label="Search a word"
            variant="standard"
            value={word}
            onChange={(e) => changeWord(e.target.value)}
          />
          {/* 语言下拉选项 */}
          <TextField
            className="select"
            select
            label="language"
            value={category}
            onChange={(e) => changeCategory(e.target.value)}
            variant="standard"
          >
            {categories.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
