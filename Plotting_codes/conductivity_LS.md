---
title: Orbital and Spin Hall Conductivity
sidebar_label: SHC OHC
---
# Plotting Orbital and Spin Hall Conductivity

In this script, we demonstrate how to plot the orbital (OHC) and spin Hall conductivity (SHC) for different doping levels in a material. We utilize the `matplotlib` library to create a grid of subplots that represent various levels of doping from 0% to 50%.

## Required Libraries

We begin by importing the necessary Python libraries:

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.gridspec import GridSpec
```

## Configuration and Setup

We define several constants to configure our plot environment:

```python
# Define constants
N_kpts = 240
fs = 17  # Font size for labels and titles
lw = 1.3  # Line width for grid lines
```

## Creating the Subplots

We set up the figure and grid spec for two rows of plots:

```python
fig = plt.figure(figsize=(16, 7))  # Adjusted for two rows of subplots
gs = GridSpec(2, 6, figure=fig)  # Two rows and six columns
```

Subplot axes are created for the two rows:

```python
axes1 = [fig.add_subplot(gs[0, i]) for i in range(6)]  # First row of subplots
axes2 = [fig.add_subplot(gs[1, i]) for i in range(6)]  # Second row of subplots
```

## Titles and Energy Range

We define titles for each subplot and set the energy range for the calculations:

```python
titles = ["w/o doping", "10%Rh", "20%Rh", "30%Rh", "40%Rh", "50%Rh"]
Ef_min = -2.0  # Minimum energy for the plot
Ef_max = 2.0   # Maximum energy for the plot
Ne = 401       # Number of energy points
E = np.linspace(Ef_min, Ef_max, Ne)  # Energy axis
```

## Loading Data and Plotting

We iterate through each row and axis to load data, process it, and plot the results:

```python
for row_index, row_axes in enumerate([axes1, axes2]):
    for i, ax in enumerate(row_axes):
        # Load data specific to each doping level
        OHC = np.load(f'0.{i}Rh-SOC001/out_ksum/JyLz_inter_ksum.npy') * 2.0 * np.pi / 20.6413
        SHC = np.load(f'0.{i}Rh-SOC001/out_ksum/JySz_inter_ksum.npy') * 2.0 * np.pi / 20.6413
        
        # Sum over contributions
        OHC_TOT = sum(OHC[j, :] for j in range(6))
        SHC_TOT = sum(SHC[j, :] for j in range(6))
        
        # Plot OHC and SHC
        ax.plot(E, OHC_TOT, color='#ff006e', linestyle='-', linewidth=2.0)
        ax.plot(E, SHC_TOT, color='#3a86ff', linestyle='-', linewidth=2.0)
        
        # Add vertical and horizontal line at zero
        ax.axvline(x=0, color='black', linestyle='--', linewidth=lw)
        ax.axhline(y=0, color='black', linestyle='--', linewidth=lw)
        
        # Add legend
        ax.legend([r'$\rm OHC$', r'$\rm SHC$'], loc='lower center', fontsize=12)
        
        # Configure labels and ticks
        if i == 0:
            ax.set_ylabel(r'$\sigma_{OH/SH}^{z} [10^3 (\hbar/e) (\Omega \cdot cm)^{-1}]$', fontsize=fs)
        else:
            ax.set_yticklabels([])
            ax.yaxis.set_ticks_position('none')
        
        # Set titles and limits
        if row_index == 0:
            ax.set_title(titles[i], fontsize=fs)
            ax.set_xlim([-2, 2])
            ax.set_ylim([-0.8, 0.8])
        elif row_index == 1:
            ax.set_xlim([-0.4, 0.7])
            ax.set_ylim([-0.15, 0.15])

# Adjust layout and save the figure
plt.tight_layout()
plt.savefig('shc-ohc-2lines.png', dpi=300)
plt.show()
```

The script concludes with adjustments to the layout, saving the figure as a PNG file, and displaying the plot.
```
