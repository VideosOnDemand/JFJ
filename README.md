
# JFJ VODs

*A **WIP** project to make a better overview for JFJ's stream VOD playlists.*

<br>
<br>

## Todo

-   Add stream preview info

<br>
<br>

## Hard Work

Currently I will not research what streams contain <br>
which games considering the greater amount of work.

However, this would greatly improve search-ability of <br>
the dataset, so if you care for that, you're welcome to <br>
make a PR.

The structure would be

```yaml
-   stream : <Stream Number>
    video : <Video Id>
    game : <Game Name>
    
# Or if multiple

-   stream : <Stream Number>
    video : <Video Id>
    games : 
        -   <Game Name>
        -   <Game Name>
```

<br>
<br>

## Licensing

The video dataset is licensed under the **[Unlicense]**.

Game previews belong to their respective owners.

Everything else is licensed under **[AGPLv3]**.

<br>


<!----------------------------------------------------------------------------->

[Unlicense]: LICENSE-DATASET
[AGPLv3]: LICENSE
