


from dataclasses import fields
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password



class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notification
        fields='__all__'



class CommentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields='__all__'

class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['id','owner','comment','offer','date']
        
        
        
        

class PropositionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model= Proposition
        fields= ['id','price','date','offre','client']
        
class PropositionListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Proposition
        fields=['id','client','price','date',"offre"]
        
        
        
        

        
class OfferDetailSerializer(serializers.ModelSerializer):
    propositions=serializers.SerializerMethodField()
    
    class Meta:
        model= Offre
        fields= ['id','product','price','startDate','endDate','propositions','etat','checked']  
    
    def get_propositions(self,instance):
        queryset=instance.propositions
        serializer=PropositionListSerializer(queryset,many=True)
        return serializer.data
    
class OfferListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Offre
        fields=['id','product','endDate','price',"startDate",'etat','checked']
    
    def get_propositions(self,instance):
        queryset=instance.propositions
        serializer=PropositionListSerializer(queryset,many=True)
        return serializer.data
        
        
        
        
        
        
class ProductDetailSerializer(serializers.ModelSerializer):
    offers=serializers.SerializerMethodField()
    class Meta:
        model= Product
        fields= ['id','productName','category','owner','description','image','offers','state']
    def get_offers(self,instance):
        queryset=instance.offers
        serializer=OfferListSerializer(queryset,many=True)
        return serializer.data
    
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['id','productName','category','owner','description','image','offers','state']   
    def get_offers(self,instance):
        queryset=instance.offers
        serializer=OfferListSerializer(queryset,many=True)
        return serializer.data     
        
        
        
        
        
        
        
        
class CategoryDetailSerializer(serializers.ModelSerializer):
    products=serializers.SerializerMethodField()
    class Meta:
        model= Category
        fields= ['id','categoryName','duration','products','active','image']
    def get_products(self,instance):
        queryset=instance.products
        serializer=ProductListSerializer(queryset,many=True)
        return serializer.data
    
class CategoryListSerializer(serializers.ModelSerializer):
     class Meta:
        model= Category
        fields= ['id','categoryName','duration','image']
        




        
class AdminUserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model= User
        fields= '__all__'
    def validate_password(self, value: str) -> str:
          """
          Hash value passed by user.

          :param value: password of a user
          :return: a hashed version of the password
          """
          return make_password(value)
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields=['id','username','first_name','last_name','email','password','phone','age','solde','photo','companie']
    def validate_password(self, value: str) -> str:
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)
class ReadOnlyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','photo','phone','email','active']





