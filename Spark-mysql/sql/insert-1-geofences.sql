USE mydb;
SET NAMES 'utf8';
INSERT INTO Geofences
    ( Coordinates, Info, Type )
VALUES
    ('[[55.701452,13.185881],[55.701101,13.184443],[55.700726,13.184915],[55.700303,13.184315],[55.699529,13.183821],[55.699638,13.182877],[55.698973,13.182834],[55.698090,13.183306],[55.697340,13.184207],[55.696929,13.183928],[55.695708,13.186718],[55.695454,13.187598],[55.696458,13.188670],[55.697981,13.187555],[55.698453,13.187898],[55.699505,13.188885],[55.699856,13.189078],[55.700073,13.188392]]', 'Stadsparken, Lund', '14'),
    ('[[55.704198,13.187895],[55.704107,13.188979],[55.703714,13.188732],[55.703611,13.188775],[55.703351,13.188517],[55.703481,13.187922],[55.703566,13.187986],[55.703675,13.187777],[55.703780,13.187954]]', 'Bantorget, Lund', '20'),
    ('[[55.706087,13.192650],[55.706123,13.193927],[55.705815,13.195440],[55.704956,13.194914],[55.704811,13.195922],[55.703802,13.194978],[55.703662,13.194967],[55.703644,13.194281],[55.704213,13.194485],[55.704503,13.192747]]', 'Lundagård, Lund', '30'),
    ('[[55.705607,13.200473],[55.705245,13.201096],[55.705063,13.201224],[55.704302,13.201428],[55.703969,13.201471],[55.703352,13.201385],[55.702790,13.201278],[55.701488,13.200612],[55.701367,13.201298],[55.702014,13.202521],[55.702480,13.203594],[55.703175,13.204721],[55.703647,13.204914],[55.704191,13.204978],[55.705932,13.204689],[55.705889,13.201234]]', 'Botaniska Trädgården, Lund', '14'),
    ('[[55.710739,13.179974],[55.710630,13.179878],[55.710316,13.180908],[55.709929,13.181702],[55.709584,13.182324],[55.709312,13.182742],[55.708944,13.183118],[55.708714,13.183311],[55.708926,13.184116],[55.709385,13.183622],[55.709639,13.183225],[55.709905,13.182764],[55.710177,13.182152],[55.710461,13.181230]]', 'Bjeredsparken, Lund', '40'),
    ('[[55.7094519,13.1952007],[55.709452,13.1952015],[55.7091996,13.1952418],[55.7092268,13.195856],[55.7093537,13.1958882],[55.7095064,13.1955609],[55.7094519,13.1952007]]','Rehabhuset, Lund','50'),
    ('[[55.7104024,13.1950647],[55.7104024,13.1950647],[55.7101924,13.194944],[55.7101365,13.1952713],[55.710342,13.1953947],[55.7104024,13.1950647]]','Hudhuset P, Lund','50'),
    ('[[55.7107912,13.194147],[55.7107897,13.1941523],[55.7106522,13.1940048],[55.7105267,13.1944071],[55.7106658,13.1945412],[55.7107912,13.194147]]','Psykiatrihuset P, Lund','50'),
    ('[[55.7112095,13.1950847],[55.7112095,13.1950847],[55.7109935,13.1948916],[55.7108983,13.1952483],[55.7110977,13.1954388],[55.7112095,13.1950847]]','Infektionskliniken P, Lund','50'),
    ('[[55.7019368,13.1952297],[55.7019489,13.1969463],[55.7014531,13.1971823],[55.7014864,13.1952833],[55.7019459,13.1952243]]','Mårtenstorget P, Lund','50'),
    ('[[55.7031071,13.1924399],[55.7031132,13.1924453],[55.7022834,13.1926062],[55.7023061,13.1927511],[55.7031011,13.1925767],[55.7031071,13.1924399]]','Stortorget P, Lund','50'),
    ('[[55.7041407,13.1880291],[55.7041438,13.1880318],[55.704106,13.1879594],[55.7040213,13.1888982],[55.7040833,13.1888874],[55.7041407,13.1880291]]','Bantorget P, Lund','50'),
    ('[[55.7085626,13.1872774],[55.7085445,13.1868911],[55.7076378,13.1870092],[55.7076499,13.1874598],[55.7085536,13.1872935]]','Centralen P, Lund','50'),
    ('[[55.7140032,13.1985213],[55.7140017,13.198524],[55.713899,13.198583],[55.7139247,13.1987251],[55.7140365,13.1986152],[55.7140032,13.1985213]]','Kompassen P, Lund','50'),
    ('[[59.3414214,18.070808],[59.3414214,18.0708509],[59.3405898,18.0701214],[59.3379198,18.0700141],[59.3372304,18.0735331],[59.3403381,18.0760651],[59.3414214,18.070808]]','Humlegården, Stockholm','14'),
    ('[[59.3397472,18.0649501],[59.3392986,18.0631047],[59.3378104,18.064242],[59.3378761,18.0653148],[59.3381168,18.0653148],[59.3381934,18.0657655],[59.3390907,18.0657225],[59.3397144,18.064993],[59.3397472,18.0649501]]','Sankt Johannes Kyrka, Stockholm','30'),
    ('[[59.3382741,18.0590203],[59.3382631,18.0590525],[59.3373002,18.059943],[59.3376394,18.0612197],[59.3386133,18.0603292],[59.3382741,18.0590203]]','Adolf Fredriks Kyrka, Stockholm','30'),
    ('[[59.338722,18.0551328],[59.3382187,18.0531801],[59.3375867,18.0537917],[59.3380983,18.0558033],[59.3387056,18.0551489],[59.338722,18.0551328]]','Tegnérlunden, Stockholm','20'),
    ('[[59.3414692,18.0456844],[59.3398134,18.0392514],[59.3381592,18.0408779],[59.3387829,18.0419722],[59.3392206,18.0416289],[59.3405227,18.0466071],[59.3414747,18.0456951],[59.3414692,18.0456844]]','Vasaparken, Stockholm','20'),
    ('[[59.3506701,18.0530848],[59.3499153,18.0504884],[59.3464913,18.053471],[59.3474649,18.0570115],[59.3499372,18.054973],[59.350331,18.0534281],[59.3506592,18.0531062],[59.3506701,18.0530848]]','Vanadislunden, Stockholm','30'),
    ('[[59.330322,18.0906666],[59.3302892,18.0907095],[59.3299608,18.0908383],[59.3301469,18.0921901],[59.3304752,18.0920399],[59.330322,18.0906666]]','Djurgårdsbron P, Stockholm','50'),
    ('[[59.3341941,18.0966943],[59.3340108,18.0976009],[59.3338822,18.0975257],[59.3340546,18.0965655],[59.3341969,18.0966889]]','Nobelparken P, Stockholm','50'),
    ('[[59.3303395,18.0700125],[59.3303285,18.0700125],[59.3300959,18.0700125],[59.3302957,18.0709405],[59.3303395,18.0700125]]','Jakobs Kyrka P, Stockholm','50'),
    ('[[56.1650053,15.585072],[56.1649933,15.5850935],[56.1631175,15.5850077],[56.1630458,15.5866599],[56.1649814,15.5867887],[56.1650053,15.585072]]','Höglands park, Karlskrona','14'),
    ('[[56.1623408,15.5819714],[56.1623588,15.5819607],[56.1616419,15.5810595],[56.1614566,15.5816174],[56.1621915,15.5824971],[56.1623408,15.5819714]]','Grevagrundet, Karlskrona','30'),
    ('[[56.1606404,15.5854204],[56.1606419,15.5854177],[56.1602058,15.5854687],[56.1601998,15.5862519],[56.1605269,15.5862948],[56.1605269,15.5861875],[56.1604074,15.5860561],[56.1604179,15.5858522],[56.1604806,15.5858415],[56.1605478,15.5856591],[56.1606464,15.5856645],[56.1606404,15.5854204]]','Trefaldighetskyrkan, Karlskrona','30'),
    ('[[56.1597408,15.585531],[56.1591135,15.5856061],[56.1590597,15.587312],[56.1596811,15.5874622],[56.1597408,15.5855417],[56.1597408,15.585531]]','Amiralitetsparken N, Karlskrona','14'),
    ('[[56.1590268,15.5855861],[56.1590417,15.5855861],[56.1585428,15.5855754],[56.1584765,15.5862984],[56.1583516,15.5869862],[56.15897,15.5872061],[56.1590268,15.5855861]]','Amiralitetsparken M, Karlskrona','14'),
    ('[[56.158495,15.5855324],[56.158489,15.5855324],[56.1572672,15.5853608],[56.1572074,15.5865141],[56.1582889,15.5869862],[56.158495,15.5855324]]','Amiralitetsparken S, Karlskrona','14'),
    ('[[56.1638821,15.5917122],[56.1638836,15.5917069],[56.1635924,15.5917712],[56.1634729,15.5931874],[56.1638463,15.5933028],[56.1638821,15.5917122]]','Kapellparken, Karlskrona','20'),
    ('[[56.1675467,15.5876701],[56.1675467,15.5876594],[56.1673138,15.5877988],[56.1671644,15.5906634],[56.167487,15.5906098],[56.1675467,15.5876701]]','Skepssbrokajen P, Karlskrona','50'),
    ('[[56.165691,15.5859415],[56.165694,15.5859415],[56.1651892,15.5859523],[56.1651742,15.5862741],[56.165685,15.586301],[56.165691,15.5859415]]','Kungsplan P, Karlskrona','50'),
    ('[[56.1631541,15.5833963],[56.1631541,15.5833963],[56.1630196,15.5834016],[56.1629778,15.5836752],[56.1631511,15.5836645],[56.1631541,15.5833963]]','Möllebackskyrkan P, Karlskrona','50'),
    ('[[56.1615306,15.5858229],[56.1615306,15.5858283],[56.1608883,15.5857532],[56.1608256,15.5867778],[56.1615186,15.5867348],[56.1615306,15.5858229]]','Stortorget P, Karlskrona','50');
