from accounts.models import CustomUser

# manage.py runscript scriptname
# 현재로써는 어떤 상황에 쓸지 감이 안오지만 모든 유저를 초기화 시킨다던지 더미 데이터를 넣는 용도로 쓰는게 아닐까 생각함
# 목데이터 검색어 faker, django seed
def run():
    users = CustomUser.objects.all()
