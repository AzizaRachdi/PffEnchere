#from xmlrpc.client import DateTime

from datetime import tzinfo
from tkinter import TRUE
from urllib import request, response
from xmlrpc.client import ResponseError
from rest_framework.parsers import JSONParser,MultiPartParser,FormParser
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import action

from .permissions import *
from .models import *
from .serializer import *
from rest_framework.viewsets import ModelViewSet,ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
import pytz


class MultipleSerializerMixin:
    # Un mixin est une classe qui ne fonctionne pas de façon autonome
    # Elle permet d'ajouter des fonctionnalités aux classes qui les étendent

    detail_serializer_class = None

    def get_serializer_class(self):
        # Notre mixin détermine quel serializer à utiliser
        # même si elle ne sait pas ce que c'est ni comment l'utiliser
        if self.action in ['retrieve','update','delete']  and self.detail_serializer_class is not None:
            # Si l'action demandée est le détail alors nous retournons le serializer de détail
            return self.detail_serializer_class
        return super().get_serializer_class()

class CategoryViewSet(MultipleSerializerMixin,ReadOnlyModelViewSet) :
    serializer_class=CategoryListSerializer
    detail_serializer_class=CategoryDetailSerializer
    def get_queryset(self):
        return Category.objects.filter(active=True) 
   
    
class AdminCategoryViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=CategoryListSerializer
    detail_serializer_class=CategoryDetailSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
        return Category.objects.all() 
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        self.get_object().disable()
        return Response('object disabled !!')
   

class ProductViewSet(MultipleSerializerMixin,ReadOnlyModelViewSet):
    serializer_class=ProductListSerializer
    detail_serializer_class=ProductDetailSerializer
    def get_queryset(self):
        return Product.objects.filter(availble=True)



class UserProductViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=ProductListSerializer
    detail_serializer_class=ProductDetailSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
            name=self.request.user.get_username()
            jsonbody=User.objects.filter(username=name)
            if name:
              id=list(jsonbody)[0].id
              if list(jsonbody)[0].is_authenticated:
                 table=Product.objects.filter(owner=id)
                 return table.filter(active=True)
            return jsonbody
        
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        self.get_object().disable()
        return Response('product disabled !!')
    
    def create(self, request, *args, **kwargs):
        data =request.data
        print(data)
        return super().create(request, *args, **kwargs)
        
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs) 
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)   
           
    def destroy(self, request, *args, **kwargs):
        return Response('sorry u can not do that')
    
class AdminProductViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=ProductListSerializer
    detail_serializer_class=ProductDetailSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
      return Product.objects.all()
  
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('product  disabled') 
 



class OfferViewSet(MultipleSerializerMixin,ReadOnlyModelViewSet):
    serializer_class=OfferListSerializer
    detail_serializer_class=OfferDetailSerializer
   
    def get_queryset(self):
        old=Offre.objects.filter(etat='ACTIVE')
        for i in old :
            utc=pytz.UTC
            #now=datetime.now().replace(tzinfo=utc)
            now=utc.localize(datetime.now())
            if i.endDate <= now:
                prod=Product.objects.get(id=i.product.id)
                owner=User.objects.get(id=prod.owner.id)
                responsible=i.buyer
                to_who=User.objects.get(is_superuser=True)
                txt="buy an offer from {}"
                subject=txt.format(owner.username)
                Notification.objects.create(responsible_id=responsible.id,to_who_id=3,subject=subject,date=datetime.now(),is_Readed=False,active=True)
                i.etat='APPROVED'
                i.save()
        return Offre.objects.filter(etat='ACTIVE') 
 

        
    
class UserOfferViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=OfferListSerializer
    detail_serializer_class=OfferDetailSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
            old=Offre.objects.filter(etat='ACTIVE')
            for i in old :
             if i.endDate <= datetime.now():
                prod=Product.objects.get(id=i.product.id)
                owner=User.objects.get(username=prod.owner)
                responsible=i.buyer
                to_who=User.objects.get(is_superuser=True)
                subject="buy an offer from ${owner.username}"
                Notification.objects.create(responsible_id=responsible.id,to_who_id=3,subject=subject,date=datetime.now(),is_Readed=False,active=True)
                
                i.etat='APPROVED'
                
                i.save()
            name=self.request.user.get_username()
            jsonbody=User.objects.filter(username=name)
            if name:
              id=list(jsonbody)[0].id
              if list(jsonbody)[0].is_authenticated:
                 products=Product.objects.filter(owner=id)
                 return(Offre.objects.filter(product__in=products))
                 
               
                 
                
            return Offre.objects.filter(pk=0)
    def create(self, request, *args, **kwargs):
        print(request.data['product'])
        prod=Product.objects.get(pk=request.data['product'])
        print('prod',prod)
        prod.availble=True
        prod.save()
        return super().create(request, *args, **kwargs)
        
             
    def update(self, request, *args, **kwargs):
        return Response('sorry u can not change it ')
    def destroy(self, request, *args, **kwargs):
        return Response('sorry u can not do that')
    
class AdminOfferViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=OfferListSerializer
    detail_serializer_class=OfferDetailSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
        return Offre.objects.all()
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('Offre disabled') 
    @action(detail=True, methods=['post'])
    def active(self,request,pk):
        self.get_object().active()
        
        return Response('Offre activated')
    @action(detail=True, methods=['post'])
    def finalcheck(self,request,pk):
        self.get_object().finalcheck()
        return Response('offer checked !!')
    

class UserPropositionViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=PropositionListSerializer
    detail_serializer_class=PropositionDetailSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
            name=self.request.user.get_username()
            jsonbody=User.objects.filter(username=name)
            if name:
              id=list(jsonbody)[0].id
              if list(jsonbody)[0].is_authenticated:
                 return Proposition.objects.filter(client=id)
            return Proposition.objects.filter(pk=0)
    def create(self, request, *args, **kwargs):
        prope=request.data
        offre=Offre.objects.get(id=int(prope["offre"]))
        if float(prope["price"]) > offre.price:
            offre.buyer=User(id=int(prope["client"]))
            offre.price=float(prope["price"])
            tab=Proposition.objects.filter(offre=int(offre.id))
            if(tab):
              print('hello',tab)
              for i in tab:
                  prop=Proposition.objects.get(id=i.id)
                  if prop.has_return==False:
                    user=User.objects.get(id=prop.client.id)
                    user.solde+=prop.price 
                    user.save()
                    
                    prop.has_return=True
                    prop.save()
            offre.save()
            return super().create(request, *args, **kwargs)
        return Response("sorry this amount not enough")
    def update(self, request, *args, **kwargs):
        return Response('sorry u can not do that')
    def destroy(self, request, *args, **kwargs):
        return Response('sorry u can not do that')
    
    
class AdminPropositionViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=PropositionListSerializer
    detail_serializer_class=PropositionDetailSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
        return Proposition.objects.all()
    def create(self, request, *args, **kwargs):
        prop=request.data
        offre=Offre.objects.get(id=prop["offre"])
        if float(prop["price"]) > offre.price:
          tab=Proposition.objects.filter(offre=offre.id)
          offre.price=float(prop["price"])
          if(tab):
              for i in offre.propositions:
                  prop=Proposition.objects.get(id=i)
                  if prop.has_return==False:
                    user=User.objects.get(id=prop.client)
                    user.solde+=prop.price 
                    user.save()
                    
                    prop.has_return=True
                    prop.save()
              offre.save()
          return super().create(request, *args, **kwargs)
        return Response("sorry this amount not enough")
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('Proposition  disabled')
    


class RegisterUserViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=UserSerializer
    detail_serializer_class=UserSerializer
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    def retrieve(self, request, *args, **kwargs):
        return Response('not allowed')
    def list(self, request, *args, **kwargs):
        return Response('not allowed')
    def get_queryset(self):
        
        return User.objects.all()
class ReadUserViewSet(MultipleSerializerMixin,ReadOnlyModelViewSet):
    serializer_class=ReadOnlyUserSerializer
    detail_serializer_class=ReadOnlyUserSerializer
    def get_queryset(self):
        return User.objects.all()

class UserViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=UserSerializer
    detail_serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    
    
    def create(self, request, *args, **kwargs):
        return Response('sorry  not allowed ')
    
    def get_queryset(self):
        
            name=self.request.user.get_username()
            jsonbody=User.objects.filter(username=name)
            if name:
              id=list(jsonbody)[0].id
              if list(jsonbody)[0].is_authenticated:
                 return User.objects.filter(pk=id)
            return jsonbody
        
    def destroy(self, request, *args, **kwargs):
        return Response('sorry u can not do that')
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('user  disabled')
    @action(detail=True,methods=['get'])
    def is_admin(self,request,pk):
        return Response({'etat':self.get_object().is_admin()}) 
    
class AdminUserViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=AdminUserSerializer
    detail_serializer_class=AdminUserSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
        
        return User.objects.all()
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('user  disabled')
    @action(detail=True, methods=['post'])
    def activate(self,request,pk):
        self.get_object().activate()
        return Response('user  disabled')
    



class CommentViewSet(MultipleSerializerMixin,ReadOnlyModelViewSet):
    serializer_class=CommentListSerializer
    detail_serializer_class=CommentDetailSerializer
    def get_queryset(self):
        return Comments.objects.filter(active=True)
    @action(detail=True,methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('commentaire disabled')

class UserCommentViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=CommentListSerializer
    detail_serializer_class=CommentDetailSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return Comments.objects.filter(active=True)
    def destroy(self, request, *args, **kwargs):
        return Response('soory u can not do that')
    def update(self, request, *args, **kwargs):
        request.data['date']=datetime.now()
        return super().update(request, *args, **kwargs)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('comment  disabled')
   
class AdminCommentViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=CommentListSerializer
    detail_serializer_class=CommentDetailSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
         return Comments.objects.all()
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('comment  disabled')
     
class NotificationViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=NotificationSerializer
    detail_serializer_class=NotificationSerializer

    def get_queryset(self):
         return Notification.objects.all()
    def retrieve(self, request, *args, **kwargs):
        return Response('not allowed')
    def list(self, request, *args, **kwargs):
        return Response('not allowed')
    def update(self, request, *args, **kwargs):
        return Response('not allowed')
    def destroy(self, request, *args, **kwargs):
        return Response('not allowed')

class AdminNotificationViewSet(MultipleSerializerMixin,ModelViewSet):
    serializer_class=NotificationSerializer
    detail_serializer_class=NotificationSerializer
    permission_classes=[IsAdminAuthenticated]
    def get_queryset(self):
        return Notification.objects.all()
    @action(detail=True, methods=['post'])
    def disable(self, request, pk):
        # Nous pouvons maintenant simplement appeler la méthode disable
        self.get_object().disable()
        return Response('notification  disabled')
    @action(detail=True, methods=['post'])
    def read(self,request,pk):
        self.get_object().read()
        return Response('notification readed')
    def update(self, request, *args, **kwargs):
        return Response('not allowed')
    
    
     
    
    
    
    


    
    
    
    
    

# Create your views here.

















































# #Category
# @csrf_exempt
# def categoryApi(request,id=0):
#     if request.method=='GET':
#         if id!=0:
#             categ=Category.objects.all()
#             categ_serial=CategorySerializer(categ,many=True)
#             for i in categ_serial.data :
#                 print (i)
#                 if i['id']==id:
#                   call=Category.objects.get(categoryName=i['categoryName'])
#                   categ_serialin=CategorySerializer(call)
#                   return JsonResponse(categ_serialin.data,safe=False)
#         categ=Category.objects.all()
#         categ_serial=CategorySerializer(categ,many=True)
#         return JsonResponse(categ_serial.data,safe=False)
    
#     elif request.method=='POST':
#         categ_data=JSONParser().parse(request)
#         categ_serial=CategorySerializer(data=categ_data)
#         print(categ_serial)
#         if categ_serial.is_valid():
#             categ_serial.save()
#             return JsonResponse('Category added!!',safe=False)
#         return JsonResponse("object  not added!!",safe=False)
    
#     elif request.method=='PUT':   
#         categ_data=JSONParser().parse(request)
#         categ=Category.objects.all()
#         categ_serial=CategorySerializer(categ,many=True)
#         for i in categ_serial.data:
#             if i['id']==id:
#                 call=Category.objects.get(categoryName=i['categoryName'])
                
#                 categ_serialin=CategorySerializer(call,data=categ_data)
#                 if categ_serialin.is_valid():
#                     categ_serialin.save()
#                     return JsonResponse('update succeded!!',safe=False)
#                 return JsonResponse('update fail !!',safe=False)
            
#     elif request.method=='DELETE':
#         categ=Category.objects.all()
#         categ_serial=CategorySerializer(categ,many=True)
#         for i in categ_serial.data:
#             if i['id']==id:
#                 call=Category.objects.get(categoryName=i['categoryName'])
#                 call.delete()
#         return JsonResponse("Deleted !!",safe=False)


# #Product
# @csrf_exempt
# def productApi(request,id=0,format=None):
#     if request.method=='GET':
#         if id!=0:
#             categ=Product.objects.all()
#             categ_serial=ProductSerializer(categ,many=True)
#             for i in categ_serial.data :
#                 print (i)
#                 if i['id']==id:
#                   call=Product.objects.get(productName=i['productName'])
#                   categ_serialin=ProductSerializer(call)
#                   return JsonResponse(categ_serialin.data,safe=False)
#         categ=Product.objects.all()
#         categ_serial=ProductSerializer(categ,many=True)
#         return JsonResponse(categ_serial.data,safe=False)
    
#     elif request.method=='POST':
#         #print(type(request.body))
#         data=MultiPartParser.parse(request.body)
#         print(data)
        
#         categ_data=JSONParser().parse(request)
#         categ_serial=ProductSerializer(data=categ_data)
#         if categ_serial.is_valid():
#             categ_serial.save()
#             return JsonResponse('Product added!!',safe=False)
#         return JsonResponse("object  not added!!",safe=False)
    
#     elif request.method=='PUT':
        
#         categ_data=JSONParser().parse(request)
#         categ=Product.objects.all()
#         categ_serial=ProductSerializer(categ,many=True)
#         for i in categ_serial.data:
#             if i['id']==id:
#                 call=Product.objects.get(productName=i['productName'])
                
#                 categ_serialin=ProductSerializer(call,data=categ_data)
#                 if categ_serialin.is_valid():
#                     categ_serialin.save()
#                     return JsonResponse('update succeded!!',safe=False)
#                 return JsonResponse('update fail !!',safe=False)
    
#     elif request.method=='DELETE':
#         categ=Product.objects.all()
#         categ_serial=ProductSerializer(categ,many=True)
#         for i in categ_serial.data:
#             if i['id']==id:
#                 call=Product.objects.get(productName=i['productName'])
#                 call.delete()
#         return JsonResponse("Deleted !!",safe=False)
    
# #Offre
# @csrf_exempt
# def offerApi(request,id=0):
#     if request.method=='GET':
#         if id!=0:
#             offre=Offre.objects.all()
#             offre_serial=OfferSerializer(offre,many=True)
#             for i in offre_serial.data :
#                 print (i)
#                 if i['id']==id:
#                   ofr=Offre.objects.get(product=i['product'])
#                   offre_serialin=OfferSerializer(ofr)
#                   return JsonResponse(offre_serialin.data,safe=False)
#         offre=Offre.objects.all()
#         offre_serial=OfferSerializer(offre,many=True)
#         return JsonResponse(offre_serial.data,safe=False)
    
#     elif request.method=='POST':
#         offre_data=JSONParser().parse(request)
#         duration=Category.objects.get(id=offre_data['category'])
#         print(offre_data)
#         offre_data['endDate'].day= offre_data['startDate'].day + duration
#         offre_data['endDate'].year=offre_data['tartDate'].year
#         offre_data['endDate'].month=offre_data['tartDate'].month
#         offre_serial=OfferSerializer(data=offre_data)
#         if offre_serial.is_valid():
#             offre_serial.save()
#             return JsonResponse('Offer added!!',safe=False)
#         return JsonResponse("object  not added!!",safe=False)
    
#     elif request.method=='PUT':
        
#         offre_data=JSONParser().parse(request)
#         offre=Offre.objects.all()
#         offre_serial=OfferSerializer(offre,many=True)
#         for i in offre_serial.data:
#             if i['id']==id:
#                 ofr=Offre.objects.get(product=i['product'])
                
#                 offre_serialin=OfferSerializer(ofr,data=offre_data)
#                 if offre_serialin.is_valid():
#                     offre_serialin.save()
#                     return JsonResponse('update succeded!!',safe=False)
#                 return JsonResponse('update fail !!',safe=False)
    
#     elif request.method=='DELETE':
#         offre=Offre.objects.all()
#         offre_serial=OfferSerializer(offre,many=True)
#         for i in offre_serial.data:
#             if i['id']==id:
#                 ofr=Offre.objects.get(product=i['product'])
#                 ofr.delete()
#         return JsonResponse("Deleted !!",safe=False)
    
# #User
# @csrf_exempt
# def userApi(request,id=0):
#     if request.method=='GET':
#         if id!=0:
#             categ=User.objects.all()
#             categ_serial=UserSerializer(categ,many=True)
#             for i in categ_serial.data :
#                 print (i)
#                 if i['id']==id:
#                   call=User.objects.get(UserName=i['UserName'])
#                   categ_serialin=UserSerializer(call)
#                   return JsonResponse(categ_serialin.data,safe=False)
#         categ=User.objects.all()
#         categ_serial=UserSerializer(categ,many=True)
#         return JsonResponse(categ_serial.data,safe=False)
    
#     elif request.method=='POST':
#         categ_data=JSONParser().parse(request)
#         categ_serial=UserSerializer(data=categ_data)
#         print(categ_serial)
#         if categ_serial.is_valid():
#             categ_serial.save()
#             return JsonResponse('User added!!',safe=False)
#         return JsonResponse("object  not added!!",safe=False)
    
#     elif request.method=='PUT':   
#         categ_data=JSONParser().parse(request)
#         categ=User.objects.all()
#         categ_serial=UserSerializer(categ,many=True)
#         for i in categ_serial.data:
#             if i['id']==id:
#                 call=User.objects.get(login=i['login'])
                
#                 categ_serialin=UserSerializer(call,data=categ_data)
#                 if categ_serialin.is_valid():
#                     categ_serialin.save()
#                     return JsonResponse('update succeded!!',safe=False)
#                 return JsonResponse('update fail !!',safe=False)
            
#     elif request.method=='DELETE':
#         categ=User.objects.all()
#         categ_serial=UserSerializer(categ,many=True)
#         for i in categ_serial.data:
#             if i['id']==id:
#                 call=User.objects.get(login=i['login'])
#                 call.delete()
#         return JsonResponse("Deleted !!",safe=False)
    
# #Proposition
# @csrf_exempt
# def propositionApi(request,id=0):
#     if request.method=='GET':
#         if id!=0:
#             proposition=Proposition.objects.all()
#             proposition_serial=PropositionSerializer(proposition,many=True)
#             for i in proposition_serial.data :
#                 print (i)
#                 if i['id']==id:
#                   ofr=Proposition.objects.get(product=i['product'])
#                   proposition_serialin=PropositionSerializer(ofr)
#                   return JsonResponse(proposition_serialin.data,safe=False)
#         proposition=Proposition.objects.all()
#         proposition_serial=PropositionSerializer(proposition,many=True)
#         return JsonResponse(proposition_serial.data,safe=False)
    
#     elif request.method=='POST':
#         proposition_data=JSONParser().parse(request)
#         proposition_serial=PropositionSerializer(data=proposition_data)
#         if proposition_serial.is_valid():
#             proposition_serial.save()
#             return JsonResponse('Proposition added!!',safe=False)
#         return JsonResponse("object  not added!!",safe=False)
    
#     elif request.method=='PUT':
        
#         proposition_data=JSONParser().parse(request)
#         proposition=Proposition.objects.all()
#         proposition_serial=PropositionSerializer(proposition,many=True)
#         for i in proposition_serial.data:
#             if i['id']==id:
#                 ofr=Proposition.objects.get(product=i['product'])
                
#                 proposition_serialin=PropositionSerializer(ofr,data=proposition_data)
#                 if proposition_serialin.is_valid():
#                     proposition_serialin.save()
#                     return JsonResponse('update succeded!!',safe=False)
#                 return JsonResponse('update fail !!',safe=False)
    
#     elif request.method=='DELETE':
#         proposition=Proposition.objects.all()
#         proposition_serial=PropositionSerializer(proposition,many=True)
#         for i in proposition_serial.data:
#             if i['id']==id:
#                 ofr=Proposition.objects.get(product=i['product'])
#                 ofr.delete()
#         return JsonResponse("Deleted !!",safe=False)
    
    
    
        
        