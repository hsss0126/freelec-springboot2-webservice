#!/usr/bin/env bash

# 쉬고있는 profile 찾기: real1이 사용중이면 real2가 쉬고있고, 반대면 real1이 쉬고 있음
function find_idle_profile() {
    RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/profile)
    # 현재 nginx가 바라보고 있는 WAS가 정상적으로 수행중인지 확인

    if [ ${RESPONSE_CODE} -ge 400 ] # 400보다 크면(즉, 40x/50x에러 모두 포함)
    then
      # 오류인 경우 실행중인 WAS가 없다는 뜻,, 고로 그냥 2번이 실행중이라고 설정
      CURRENT_PROFILE=real2
    else
      CURRENT_PROFILE=$(curl -s http://localhost/profile)
    fi

    if [ ${CURRENT_PROFILE} == real1 ]
    then
      IDLE_PROFILE=real2
    else
      IDLE_PROFILE=real1
    fi

    echo "${IDLE_PROFILE}"
}

# 쉬고있는 profile의 port찾기
function find_idle_port() {
  IDLE_PROFILE=$(find_idle_profile)
  if [ ${IDLE_PROFILE} == real1 ]
  then
    echo "8081"
  else
    echo "8082"
  fi
}