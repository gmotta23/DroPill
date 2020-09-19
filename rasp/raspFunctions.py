import RPi.GPIO as GPIO
import threading
import time
from datetime import datetime


def get_time():
    return datetime.now().strftime("%H:%M:%S")


def time_diff_seconds(t1, t2):
    FMT = '%H:%M:%S'
    tdelta = datetime.strptime(t2, FMT) - datetime.strptime(t1, FMT)
    return tdelta.seconds


def buzzer_calm():
    GPIO.setmode(GPIO.BCM)
    buzzer = 17
    GPIO.setup(buzzer, GPIO.OUT)
    while not button_0 and not timer_calm:
        GPIO.output(buzzer, GPIO.HIGH)
        time.sleep(1)
        GPIO.output(buzzer, GPIO.LOW)
        time.sleep(1)
    GPIO.output(buzzer, GPIO.LOW)
    return


def buzzer_angry():
    GPIO.setmode(GPIO.BCM)
    buzzer = 17
    GPIO.setup(buzzer, GPIO.OUT)
    while not button_0 and not timer_angry:
        GPIO.output(buzzer, GPIO.HIGH)
        time.sleep(0.1)
        GPIO.output(buzzer, GPIO.LOW)
        time.sleep(0.1)
    GPIO.output(buzzer, GPIO.LOW)
    return


def my_callback(channel):
    print("falling edge detected on 18")
    global button_0
    button_0 = True
    GPIO.remove_event_detect(18)


def my_callback2(channel):
    print("falling edge detected on 26")
    global button_0
    button_0 = True
    GPIO.remove_event_detect(26)


def setup_0():
    # setup button_0
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(18, GPIO.FALLING, callback=my_callback, bouncetime=300)

    # setup leds
    GPIO.setup(green, GPIO.OUT)
    GPIO.setup(yellow, GPIO.OUT)
    GPIO.setup(red, GPIO.OUT)


def setup_1():
    # setup button_1
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(26, GPIO.FALLING, callback=my_callback2, bouncetime=300)


def first_timer():
    # wait for first button press
    s1 = get_time()
    global button_0
    button_0 = False
    GPIO.output(green, GPIO.HIGH)
    while int(time_diff_seconds(s1, get_time())) <= 5 and button_0 == False:
        pass
    GPIO.output(green, GPIO.LOW)

    global timer_calm
    timer_calm = False
    if not button_0:
        GPIO.output(yellow, GPIO.HIGH)
        s1 = get_time()
        calm_buzzer = threading.Thread(target=buzzer_calm, args=())
        calm_buzzer.start()
        while int(time_diff_seconds(s1, get_time())) <= 5 and button_0 == False:
            pass
        timer_calm = True
        GPIO.output(yellow, GPIO.LOW)

    global timer_angry
    timer_angry = False
    if not button_0:
        GPIO.output(red, GPIO.HIGH)
        s1 = get_time()
        angry_buzzer = threading.Thread(target=buzzer_angry, args=())
        angry_buzzer.start()
        while int(time_diff_seconds(s1, get_time())) <= 5 and button_0 == False:
            pass
        timer_angry = True
        GPIO.output(red, GPIO.LOW)

    if not button_0:
        print("ninguem apareceu")
        time.sleep(5)
        GPIO.cleanup()
        return False
    return True


def second_timer():
    # wait for second button press
    s1 = get_time()
    global button_0
    button_0 = False
    GPIO.output(green, GPIO.HIGH)
    while int(time_diff_seconds(s1, get_time())) <= 5 and button_0 == False:
        pass
    GPIO.output(green, GPIO.LOW)

    global timer_calm
    timer_calm = False
    if not button_0:
        GPIO.output(yellow, GPIO.HIGH)
        s1 = get_time()
        calm_buzzer = threading.Thread(target=buzzer_calm, args=())
        calm_buzzer.start()
        while int(time_diff_seconds(s1, get_time())) <= 5 and button_0 == False:
            pass
        timer_calm = True
        GPIO.output(yellow, GPIO.LOW)

    global timer_angry
    timer_angry = False
    if not button_0:
        GPIO.output(red, GPIO.HIGH)
        s1 = get_time()
        angry_buzzer = threading.Thread(target=buzzer_angry, args=())
        angry_buzzer.start()
        while int(time_diff_seconds(s1, get_time())) <= 5 and button_0 == False:
            pass
        timer_angry = True
        GPIO.output(red, GPIO.LOW)

    if button_0:
        print("tudo certo")
    else:
        print("nao pegou")

    time.sleep(5)
    GPIO.cleanup()
    return button_0


def motor(rsvr):
    print("Usando motor do reservatório: " + rsvr)
    GPIO.output(green, GPIO.HIGH)
    GPIO.output(yellow, GPIO.HIGH)
    GPIO.output(red, GPIO.HIGH)
    print("oi")
    GPIO.setmode(GPIO.BCM)
    # Pinos de conexao ao motor
    # Pinos 40, 38, 36, 32
    # GPIO21,GPIO20,GPIO16,GPIO12
    StepPins = [21, 20, 16, 12]
    # Define os pinos como saida
    for pin in StepPins:
        print("Setup pins")
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, False)
    # Sequencia de ativacao
    Seq = [[1, 0, 0, 0],
           [1, 1, 0, 0],
           [0, 1, 0, 0],
           [0, 1, 1, 0],
           [0, 0, 1, 0],
           [0, 0, 1, 1],
           [0, 0, 0, 1],
           [1, 0, 0, 1]]

    StepCount = len(Seq) - 1
    # Configura sentido de giro
    StepDir = 2  # 1 ou 2 para sentido horario
    # -1 ou-2 para sentido anti-horario
    # Tempo de espera
    WaitTime = 1 / float(500)
    # Inicializa variaveis
    StepCounter = 0
    for iasd in range(0, 5000):
        # Movimenta o motor e envia os dados de ativacao
        # para o display
        for pin in range(0, 4):
            xpin = StepPins[pin]
            # print (StepCounter)
            # print (pin)
            if Seq[StepCounter][pin] != 0:
                # print " Step %i Enable %i" %(StepCounter,xpin)
                GPIO.output(xpin, True)
            else:
                GPIO.output(xpin, False)
        StepCounter += StepDir
        # Ao final da sequencia, reinicia o processo
        if (StepCounter >= StepCount):
            StepCounter = 0
        if (StepCounter < 0):
            StepCounter = StepCount
        # Delay para movimentar o motor
        time.sleep(WaitTime)
        # input("aperte espaco")

    GPIO.output(green, GPIO.LOW)
    GPIO.output(yellow, GPIO.LOW)
    GPIO.output(red, GPIO.LOW)


green, yellow, red = 8, 7, 1
