export const handleCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(String(text));
    alert("클립보드에 링크가 복사되었습니다.");
  } catch (e) {
    alert(
      "navigator.clipboard.writeText를 사용해 구현되어있지만, 클립보드는 HTTPS에서만 접근이 가능하므로 실행되지않습니다"
    );
  }
};
