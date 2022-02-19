import axios from "axios";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container, Switch } from "@material-ui/core";
import Header from "./components/Header";
import Definitions from "./components/Definitions";
import { alpha, styled } from "@material-ui/system";
import { grey } from "@material-ui/core/colors";

function App() {
  const [word, setWord] = useState("");
  const [hasMeaning, setHasMeaning] = useState(true);
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: grey[600],
      "&:hover": {
        backgroundColor: alpha(grey[600]),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: grey[600],
    },
  }));

  // 防抖函数
  function useDebounce(fn, delay) {
    const { current } = useRef({ fn, timer: null });
    useEffect(
      function () {
        current.fn = fn;
      },
      [current, fn]
    );

    return useCallback(
      (...args) => {
        if (current.timer) {
          clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
          current.fn.call(this, ...args);
        }, delay);
      },
      [current, delay]
    );
  }

  // 请求api获取词义
  async function getMeanings() {
    if (word) {
      try {
        const data = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        );
        setHasMeaning(true);
        console.log(data.data);
        setMeanings(data.data);
      } catch (error) {
        console.log(error);
        // 请求失败
        setHasMeaning(false);
        setMeanings([]);
      }
    }
  }

  // 使用防抖函数
  let showMeanings = useDebounce(getMeanings, 500);

  useEffect(showMeanings, [showMeanings, category, word]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.4s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Dark" : "Light"}</span>
          <DarkMode
            checked={lightMode}
            onChange={() => {
              setLightMode(!lightMode);
            }}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          setMeanings={setMeanings}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            hasMeaning={hasMeaning}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
