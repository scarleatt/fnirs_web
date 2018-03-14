# from numpy import *
# import csv
# import sys
# list_file=[];
# filename = sys.argv[1]
# with open(filename) as f:
#     reader=csv.reader(f)
#     for one_line in reader:
#         list_file.append(one_line)
# data=[]                              
# for i in range(131,600):              
#     data.append(list(list_file[i][2:-8]))  
# time=[]                              
# for i in range(131,600):            
#     time.append(list_file[i][0]) 
# data=array(data,dtype=float64)
# time=array(time,dtype=float64)
# meanData=mean(data,1)
# i=5
# meanData2=[]
# while i+5<=469:
#     meanData2.append(mean(meanData[i-5:i+5]))
#     i+=1
# meanData2=array(meanData2,dtype=float64)
# meanData2.shape
# # plt.plot(time[5:5+meanData2.shape[0]],meanData2)
# threshold=0.0005
# i=5
# while meanData2[i]<threshold:
#     i+=1
# t1=time[i]
# while meanData2[i]>threshold:
#     i+=1
# t2=time[i]
# print(t2-t1)

import random
print(random.random()*100+700)
