from posixpath import basename
from django.urls import path,include
from . views import *
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router=routers.SimpleRouter()

router.register('category',CategoryViewSet,basename='category')
router.register('admin/category',AdminCategoryViewSet,basename='admin-category')
router.register('user/product',UserProductViewSet,basename='user-product')
router.register('admin/product',AdminProductViewSet,basename='admin-product')
router.register('offre',OfferViewSet,basename='offer')
router.register('user/offre',UserOfferViewSet,basename='user-offer')
router.register('admin/offre',AdminOfferViewSet,basename='admin-offer')
router.register('user/proposition',UserPropositionViewSet,basename='user-proposition')
router.register('admin/proposition',AdminPropositionViewSet,basename='admin-proposition')
router.register('readuser',ReadUserViewSet,basename='readuser')
router.register('user/profile',UserViewSet,basename='user-profile')
router.register('admin/user',AdminUserViewSet,basename='admin-user')
router.register('comments',CommentViewSet,basename='comments')
router.register('user/comment',UserCommentViewSet,basename='user-comments')
router.register('admin/comments',AdminCommentViewSet,basename='admin-comment')
router.register('notification',NotificationViewSet,basename='notification')
router.register('admin/notification',AdminNotificationViewSet,basename='admin-notification')
router.register('register',RegisterUserViewSet,basename='register')
router.register('products',ProductViewSet,basename='products')


urlpatterns = [
   
    
    path('enchere/',include(router.urls)),
    path('login/',TokenObtainPairView.as_view(),name='login'),
    path('relog/',TokenRefreshView.as_view(),name='relog')
    
]
