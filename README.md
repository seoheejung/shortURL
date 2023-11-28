## 📫 next.JS와 chatGPT를 활용하여 URL 변경 서비스 만들기

### ✨사이트 주소
https://sul.run.goorm.site/    
~~www.sul1.store~~

### 📌 과정
1. 사용자로부터 원래의 URL을 입력 받기
2. URL에 대한 고유한 짧은 URL을 생성하기
3. 원래의 URL과 짧은 URL을 데이터베이스에 저장하기
4. 사용자가 짧은 URL을 방문하면, 데이터베이스에서 해당하는 원래의 URL을 찾아 리다이렉트 시키기

#### 💡 필요 패키지
```
npm install typescript -g 
npm install next react react-dom typescript @types/react @types/node mariadb nanoid
npm install --save-dev ts-node nodemon
npm install --save-dev @types/react-dom
```

#### 💡 프로젝트 구조
```
- pages
  - index.tsx # 메인 페이지
  - [shortId].tsx # 리다이렉션 페이지
- lib
  - db.ts # 데이터베이스 연결 및 쿼리 함수들 
  - css # css 파일이 있는 폴더
- types.d.ts # 타입 정의 파일 
```
#### 💡 데이터베이스 구조
```
DB NAME : shortURL
Talbe Name : saveURL
```

#### 💡 테이블 DDL
```
CREATE TABLE `saveURL` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `long_url` varchar(4000) DEFAULT NULL,
  `short_url` varchar(4000) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```

#### 💡 사이트 실행 방법
```
// TypeScript 파일을 JavaScript 파일로 변환
tsc -w 

// 서버 실행
npm run dev

// pm2 사용
npm install pm2 -g
npm run build
pm2 start start.sh

// 서버 재실행
pm2 kill
npm run build
pm2 start start.sh
```

#### 💬 이후 작업
```
CSS 작업 (완료)
서버  적용 (구름 IDE 적용 완료 / pm2 추가 완료)
AWS 서버 이전
구글 웹마스터 적용 (완료)
네이버 웹마스터 적용 (완료)
```