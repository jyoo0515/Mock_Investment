# Mock Investment
## Description
공공데이터포털에서 제공하는 [주식 시세 API](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15094808)를 이용한 주식 모의투자 애플리케이션

## Project Structure
```
stock
├─ .github
│  └─ workflows
│     ├─ deploy.yml
│     └─ test.yml
├─ appspec.yml
├─ client
│  └─ src
├─ docker-compose.yml
├─ Dockerfile
├─ nginx
│  └─ nginx.conf
├─ scripts
│  ├─ after_deploy.sh
│  └─ before_deploy.sh
├─ src
├─ tests
│  ├─ app.test.ts
│  ├─ stock.test.ts
│  └─ user.test.ts
```