import json
from crontab import CronTab

# get DroPill schedule
with open('data.json', 'r') as fp:
    dropill = json.load(fp)

# get all the times
horarios = []
for remedios in dropill["data"]:
    times = remedios["remedio_horario"].split("/")
    for time in times:
        horarios.append(time)
    remedios["remedio_horario"] = remedios["remedio_horario"].split("/")

# Reformat schedule
horarios = sorted(list(set(horarios)))
horarios_table = dict()
for horario in horarios:
    # zeros = []
    # for i in range(len(dropill["data"])):
    #     zeros.append(0)
    # horarios_table[horario] = zeros
    horarios_table[horario] = [0, 0, 0, 0, 0]
    for i, remedios in enumerate(dropill["data"]):
        if horario in remedios["remedio_horario"]:
            horarios_table[horario][i] = int(remedios["remedio_dosagem"])

my_cron = CronTab(user='walter')
my_cron.remove_all()

# Create all jobs
for horario in horarios:
    hora, minuto = horario.split(":")
    job_command = '/home/walter/Documents/Projetos/DroPill/.venv/bin/python3 ' \
                  '/home/walter/Documents/Projetos/DroPill/dropill.py'
    add_command = ""
    for i in horarios_table[horario]:
        add_command = add_command + " " + str(i)
    print("\ntime: " + horario)
    print(job_command + add_command)
    job = my_cron.new(command=job_command + add_command)
    job.hour.on(int(hora))
    job.minute.on(int(minuto))
    my_cron.write()

job = my_cron.new(command='/home/walter/Documents/Projetos/DroPill/.venv/bin/python3 '
                          '/home/walter/Documents/Projetos/DroPill/cron.py')
job.hour.on(00)
job.minute.on(45)
my_cron.write()

for job in my_cron:
    print(job)
