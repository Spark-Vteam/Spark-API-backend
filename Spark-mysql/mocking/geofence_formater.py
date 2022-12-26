# https://www.keene.edu/campus/maps/tool/
# 10 -> x[0] slow, x[1] * 2 = km/h limit
# 20 no parking
# 30 no riding
# 40 deleted
# 50 parking


i = "Stortorget P, Karlskrona"
t = "50"

res_s = ""

lst =  [
      [
        -344.4141771,
        56.1615306
      ],
      [
        -344.4141717,
        56.1615306
      ],
      [
        -344.4142468,
        56.1608883
      ],
      [
        -344.4132222,
        56.1608256
      ],
      [
        -344.4132652,
        56.1615186
      ],
      [
        -344.4141771,
        56.1615306
      ]
    ]

for l in lst:
    res_s += f"[{l[1]},{l[0]}],"

print(f"('[{res_s[:-1]}]','{i}','{t}'),")