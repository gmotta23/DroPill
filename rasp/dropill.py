import sys
import json
# from raspFunctions import *
from datetime import datetime
import time

if len(sys.argv) != 6:
    print("use: python3 dropill.py 1 2 3 4 5")
    exit()

pills_inputs = sys.argv[1:]

# get DroPill schedule
with open('data.json', 'r') as fp:
    dropill = json.load(fp)

# Get time
now = datetime.now()
dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
time_start = time.time()

# All raspInput/Output parts
# setup_0()
# press_0_ok = first_timer()
press_0_ok = True  # DELETE THIS
# Start motor
if press_0_ok:
    # Go thought all pills
    for i, qtde in enumerate(pills_inputs):
        qtde = int(qtde)
        # Process the number of asked pills
        while qtde > 0:
            print("Reservatório " + str(i + 1))
            # motor(str(i + 1))
            qtde -= 1
            # update .json
            dropill["receita"][i]["qtd"] -= 1
    # Save DroPill updated schedule
    with open('data.json', 'w') as fp:
        json.dump(dropill, fp)
    # setup_1()
    # press_1_ok = second_timer()
    press_1_ok = True  # DELETE THIS
    if press_1_ok:
        status = 0
    else:
        status = 2
else:
    status = 1

time_end = time.time()
end_sec = int((time_end - time_start) % 60)
end_min = int((time_end - time_start - end_sec) / 60)

# Open report
with open("relatorio.json", 'r') as fp:
    relatorio = json.load(fp)
# create base report
base_r = dict()
base_r['remedio'] = ""
base_r['tempo'] = ""
base_r['n_comprimidos'] = -1
base_r['status'] = -1
relatorio[dt_string] = []
for i in range(5):
    relatorio[dt_string].append(base_r.copy())
# update base report
for i, remedio in enumerate(dropill["receita"]):
    relatorio[dt_string][i]['remedio'] = remedio['remedio_nome']
    if pills_inputs[i] != "0":
        relatorio[dt_string][i]['tempo'] = f"{end_min}m{end_sec}s"
        relatorio[dt_string][i]['status'] = status
        if status == 1:
            relatorio[dt_string][i]['n_comprimidos'] = 0
        else:
            relatorio[dt_string][i]['n_comprimidos'] = int(pills_inputs[i])

# Save report
with open("relatorio.json", 'w') as fp:
    json.dump(relatorio, fp)
